import { GameTeamSearchComponent } from './../game-team-search/game-team-search.component';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { GameTeam, NewMatch } from 'src/app/model/match';
import { Player } from 'src/app/model/player';
import { CommonsService } from 'src/app/services/commons.service';
import { MatchService } from 'src/app/services/match.service';
import { MatchPlayersComponent } from '../match-players/match-players.component';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.css'],
})
export class NewMatchComponent implements OnInit {
  matchForm: FormGroup;
  awayGameTeamControl = new FormControl(0, [Validators.min(1)]);
  homeGameTeamControl = new FormControl(0, [Validators.min(1)]);

  availableGameTeams: GameTeam[] = [];
  @Output() outPutNewMatch = new EventEmitter<number>();
  leaguePlayers: Player[] = [];

  @ViewChild('homePlayersRef') homePlayersRef!: MatchPlayersComponent;
  @ViewChild('awayPlayersRef') awayPlayersRef!: MatchPlayersComponent;
  @ViewChild('homeGameTeamRef') homeGameTeamRef!: GameTeamSearchComponent;
  @ViewChild('awayGameTeamRef') awayGameTeamRef!: GameTeamSearchComponent;

  homePlayersError: boolean = false;
  awayPlayersError: boolean = false;

  constructor(
    private playerService: PlayerService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      matchDayId: number;
      gameTeamFlag: boolean;
      seasonId: number;
    },
    private matchService: MatchService
  ) {
    this.matchForm = this.formBuilder.group({
      matchDayId: [0, [Validators.required, Validators.min(1)]],
      homePlayers: [[], [Validators.min(1), Validators.maxLength(2)]],
      awayPlayers: [[], [Validators.minLength(1), Validators.max(2)]],
      homeGoals: [0, Validators.required],
      awayGoals: [0, Validators.required],
      homeGameTeam: this.homeGameTeamControl,
      awayGameTeam: this.awayGameTeamControl,
    });
  }

  ngOnInit(): void {
    this.getAvailableGameTeams(this.data.matchDayId);
    this.playerService.getLeaguePlayersBySeason(this.data.seasonId).subscribe({
      next: (response) => {
        this.leaguePlayers = response.players;
      },
    });
  }

  getAvailableGameTeams(matchDayId: number) {
    this.matchService.getAvailableGameTeams(matchDayId).subscribe({
      next: (value) => (this.availableGameTeams = value.gameTeams),
    });
  }

  addMatch(): void {
    this.homePlayersError = false;
    this.awayPlayersError = false;

    this.homePlayerList.length = 0;
    this.awayPlayerList.length = 0;

    this.awayPlayersRef.addedPlayers.forEach((player) => {
      if (player.id) {
        this.addAwayPlayer(player.id);
      }
    });

    this.homePlayersRef.addedPlayers.forEach((player) => {
      if (player.id) {
        this.addHomePlayer(player.id);
      }
    });

    this.matchForm.controls['matchDayId'].setValue(this.data.matchDayId);

    if (this.matchForm.valid) {
      var newMatchId: number = 0;
      var match: NewMatch = {
        matchDayId: this.data.matchDayId,
        homePlayers: this.matchForm.get('homePlayers')?.value,
        homeGoals: this.matchForm.get('homeGoals')?.value,
        homeGameTeamId: this.matchForm.get('homeGameTeam')?.value,
        awayPlayers: this.matchForm.get('awayPlayers')?.value,
        awayGoals: this.matchForm.get('awayGoals')?.value,
        awayGameTeamId: this.matchForm.get('awayGameTeam')?.value,
      };
      console.log('newMatch', match);
      this.matchService.createMatch(match).subscribe({
        next: (value) => {
          newMatchId = value.matchId;
        },
        complete: () => {
          this.outPutNewMatch.emit(newMatchId);
        },
      });
    } else {
      this.matchForm.markAllAsTouched();
      this.awayGameTeamRef.validForms();
      this.homeGameTeamRef.validForms();
      this.checkHomePlayersList();
      this.checkAwayPlayersList();
    }
  }
  checkAwayPlayersList() {
    if (this.homePlayerList.length < 1 || this.homePlayerList.length > 2) {
      this.homePlayersError = true;
    }
  }
  checkHomePlayersList() {
    if (this.awayPlayerList.length < 1 || this.awayPlayerList.length > 2) {
      this.awayPlayersError = true;
    }
  }

  takeHomeTeam(gameTeamId: number) {
    this.matchForm.controls['homeGameTeam'].setValue(gameTeamId);
  }

  takeAwayTeam(gameTeamId: number) {
    this.matchForm.controls['awayGameTeam'].setValue(gameTeamId);
  }

  get homePlayerList(): number[] {
    return <number[]>this.matchForm.get('homePlayers')?.value;
  }

  get awayPlayerList(): number[] {
    return <number[]>this.matchForm.get('awayPlayers')?.value;
  }

  preparePlayer(player: Player): FormGroup {
    return new FormGroup(player.id);
  }

  addHomePlayer(playerId: number): void {
    this.homePlayerList.push(playerId);
  }

  addAwayPlayer(playerId: number): void {
    this.awayPlayerList.push(playerId);
  }

  resetForm() {
    this.matchForm.reset;
    this.homePlayersRef.resetForm('home');
    this.awayPlayersRef.resetForm('away');
  }
}
