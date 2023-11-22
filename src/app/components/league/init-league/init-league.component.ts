import {
  Component,
  OnChanges,
  SimpleChanges,
  inject,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InitLeagueResponse } from 'src/app/model/init-league-response';
import { HeaderPanelData, League } from 'src/app/model/league';
import { Player } from 'src/app/model/player';
import { Table } from 'src/app/model/table';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-init-league',
  templateUrl: './init-league.component.html',
  styleUrls: ['./init-league.component.css'],
})
export class InitLeagueComponent implements OnChanges {
  chosenPlayer: Player | null = null;
  route: ActivatedRoute = inject(ActivatedRoute);
  leagueId = -1;
  isResponseComplete: boolean = false;
  headerPanel: HeaderPanelData = {
    title: '',
    imgSrc: './../../../../assets/default_league_logo.png',
  };
  initLeague: InitLeagueResponse | null = null;
  playerList: Player[] = [];
  leagueTable: Table = {
    header: '',
    pointCountingMethod: '',
    tableRows: [],
  };

  constructor(private leagueService: LeagueService) {
    this.leagueId = Number(this.route.snapshot.params['leagueId']);
    this.leagueService.initLeagueById(this.leagueId).subscribe({
      next: (response) => {
        this.initLeague = response;
        this.headerPanel.title = response.league.name;
        if (response.league.logoUrl) {
          this.headerPanel.imgSrc = response.league.logoUrl;
        }
      },
      complete: () => {
        this.isResponseComplete = true;
        if (this.initLeague) {
          this.playerList = this.initLeague?.playerList;
          this.leagueTable = this.initLeague?.leagueTable;
        }
      },
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes from init-league', changes);
  }

  takeChosenPlayer(player: Player | null) {
    this.chosenPlayer = player;
  }

  newSeasonDialogCounter = 0;
  getSeasonFrameClickEvent() {
    console.log('FLAG CHANGE', this.newSeasonDialogCounter);

    this.newSeasonDialogCounter = this.newSeasonDialogCounter + 1;
  }
}
