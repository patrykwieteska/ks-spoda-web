import {
  Component,
  OnChanges,
  SimpleChanges,
  inject,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InitLeagueResponse } from 'src/app/model/init-league-response';
import { HeaderPanelData, League } from 'src/app/model/league';
import { Player } from 'src/app/model/player';
import { Table } from 'src/app/model/table';
import { LeagueService } from 'src/app/services/league.service';
import { PlayerListComponent } from '../../player/player-list/player-list.component';
import { TableComponent } from '../league-table/league-table.component';
import { LeagueNewsComponent } from '../league-news/league-news.component';

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
  initLeagueResponse: InitLeagueResponse | null = null;
  playerList: Player[] = [];
  leagueTable: Table = {
    header: '',
    pointCountingMethod: '',
    tableRows: [],
  };

  @ViewChild('playerListRef') playerListRef!: PlayerListComponent;
  @ViewChild('leagueNewsRef') leagueNewsRef!: LeagueNewsComponent;

  constructor(private leagueService: LeagueService) {
    this.leagueId = Number(this.route.snapshot.params['leagueId']);
    this.initLeague();
  }

  initLeague() {
    this.leagueService.initLeagueById(this.leagueId).subscribe({
      next: (response) => {
        this.initLeagueResponse = response;
        this.headerPanel.title = response.league.name;
        if (response.league.logoUrl) {
          this.headerPanel.imgSrc = response.league.logoUrl;
        }
      },
      complete: () => {
        this.isResponseComplete = true;
        if (this.initLeagueResponse) {
          this.playerList = this.initLeagueResponse?.playerList;
          this.leagueTable = this.initLeagueResponse?.leagueTable;
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

  getPlayersFrameClickEvent() {
    this.playerListRef.addNewPlayer();
  }

  takeNewPlayerEvent() {
    this.initLeague();
    this.leagueNewsRef.leagueTableRef.getLeagueTable();
  }
}
