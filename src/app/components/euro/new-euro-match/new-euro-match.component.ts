import { CurrentStage } from './../../../model/euro';
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
import { MatchService } from 'src/app/services/match.service';
import { PlayerService } from 'src/app/services/player.service';
import { EuroService } from 'src/app/services/euro-service.service';
import { EuroMatch } from 'src/app/model/euro';
import { EuroMatchPlayersComponent } from '../euro-match-players/euro-match-players.component';

@Component({
  selector: 'app-new-euro-match',
  templateUrl: './new-euro-match.component.html',
  styleUrls: ['./new-euro-match.component.css'],
})
export class NewEuroMatchComponent implements OnInit {
  matchForm: FormGroup;

  @Output() outPutNewMatch = new EventEmitter<number>();
  leaguePlayers: Player[] = [];

  @ViewChild('homePlayersRef') homePlayersRef!: EuroMatchPlayersComponent;
  @ViewChild('awayPlayersRef') awayPlayersRef!: EuroMatchPlayersComponent;

  homePlayersError: boolean = false;
  awayPlayersError: boolean = false;
  euroMatch!: EuroMatch;
  homeColor: string = 'yellow';
  awayColor: string = 'red';
  addButtonDisabled = false;

  @Output() playedEuroTeams = new EventEmitter<number[]>();

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
    private matchService: MatchService,
    private euroService: EuroService
  ) {
    this.matchForm = this.formBuilder.group({
      matchDayId: [0, [Validators.required, Validators.min(1)]],
      homePlayers: [[], [Validators.min(1), Validators.maxLength(2)]],
      awayPlayers: [[], [Validators.minLength(1), Validators.max(2)]],
      homeGoals: [0, Validators.required],
      awayGoals: [0, Validators.required],
      euroMatchId: [0],
    });
  }

  ngOnInit(): void {
    this.playerService.getLeaguePlayersBySeason(this.data.seasonId).subscribe({
      next: (response) => {
        this.leaguePlayers = response.players;
      },
    });

    this.euroService.getNextEuroMatch(this.data.seasonId).subscribe({
      next: (response) => {
        this.euroMatch = response;
        this.matchForm.setControl;
      },
    });
  }

  addMatch(): void {
    this.addButtonDisabled = true;
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
        homeGameTeamId: null,
        awayPlayers: this.matchForm.get('awayPlayers')?.value,
        awayGoals: this.matchForm.get('awayGoals')?.value,
        awayGameTeamId: null,
        euroMatchId: this.euroMatch.matchNumber,
        penalties: null,
        isPlayOffMatch: this.euroMatch.tournamentGroup === 'PLAYOFF',
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
      this.checkHomePlayersList();
      this.checkAwayPlayersList();
    }

    this.playedEuroTeams.emit([
      this.euroMatch.homeTeam.teamId,
      this.euroMatch.awayTeam.teamId,
    ]);
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

  isGroup(stage: CurrentStage): boolean {
    return stage.stage == 'GROUP';
  }
}
