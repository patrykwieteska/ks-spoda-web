import { Location } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/model/player';
import { SeasonTableComponent } from '../season-table/season-table.component';
import { SeasonService } from 'src/app/services/season.service';
import { Season } from 'src/app/model/season';
import { HeaderPanelData, League } from 'src/app/model/league';
import { SimpleMatchDay } from 'src/app/model/match-day';
import { ContentFrameComponent } from '../../commons/content-frame/content-frame.component';
import { MatchListComponent } from '../../match/match-list/match-list.component';
import { HeaderPanelComponent } from '../../commons/header-panel/header-panel.component';
import { MatchdayStatsComponent } from '../../matchday/matchday-stats/matchday-stats.component';

@Component({
  selector: 'app-init-season',
  templateUrl: './init-season.component.html',
  styleUrls: ['./init-season.component.css'],
})
export class InitSeasonComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  seasonId: number;
  currentMatchDayId: number = -1;
  leaguePlayerList: Player[] = [];
  leagueData!: League;
  seasonData!: Season;
  chosenMatchDay!: SimpleMatchDay;
  euroEnabled: boolean = false;

  headerPanel: HeaderPanelData = {
    title: '',
    imgSrc: './../../../../assets/default_league_logo.png',
  };

  @ViewChild('seasonTableRef') seasonTableRef!: SeasonTableComponent;
  @ViewChild('matchDayContentFrame')
  matchDayContentFrame!: ContentFrameComponent;
  @ViewChild('matchContentFrame') matchContentFrame!: ContentFrameComponent;
  @ViewChild('matchListRef') matchListRef!: MatchListComponent;
  @ViewChild('headerPanelRef') headerPanelRef!: HeaderPanelComponent;
  @ViewChild('matchDayStatsRef') matchDayStatsRef!: MatchdayStatsComponent;

  constructor(
    private location: Location,
    private seasonService: SeasonService
  ) {
    this.seasonId = this.route.snapshot.params['seasonId'];
  }
  ngOnInit(): void {
    this.initSeason();
  }
  initSeason() {
    var leaguePlayerList: Player[];
    var season: Season;
    var league: League;
    this.seasonService.initSeason(this.seasonId).subscribe({
      next: (response) => {
        leaguePlayerList = response.leaguePlayers;
        season = response.seasonData;
        league = response.leagueData;
        console.log(leaguePlayerList);
      },
      complete: () => {
        this.leaguePlayerList = leaguePlayerList;
        this.leagueData = league;
        this.seasonData = season;
        this.euroEnabled = this.seasonData.isEuro;
        this.prepareSeasonTitle(
          league.name,
          season.seasonCount,
          season.seasonName
        );
        this.prepareSeasonLogo(league.logoUrl, season.image);
      },
    });
  }
  prepareSeasonLogo(leagueLogo: string, seasonLogo: string): void {
    if (seasonLogo) {
      this.headerPanelRef.imgSrc = seasonLogo;
    } else if (leagueLogo) {
      this.headerPanelRef.imgSrc = leagueLogo;
    }
  }

  prepareSeasonTitle(
    leagueName: string,
    seasonCount: number | null,
    seasonName: string
  ): void {
    var name = '';
    if (seasonName) {
      name = seasonName + '(' + seasonCount + ')';
    } else {
      name = leagueName + ' - SEZON ' + seasonCount;
    }
    this.headerPanelRef.title = name;
  }

  newMatchDayDialogCounter = 0;
  getNewMatchDayEvent() {
    this.newMatchDayDialogCounter = this.newMatchDayDialogCounter + 1;
  }

  backToLeague() {
    this.location.back();
  }

  newMatchDialogCounter = 0;
  getNewMatchEvent() {
    this.newMatchDialogCounter = this.newMatchDialogCounter + 1;
  }

  takeMatchDayFromList(matchDay: SimpleMatchDay | null) {
    if (matchDay == null) {
      this.matchDayContentFrame.buttonDisabled = true;
      this.matchContentFrame.buttonDisabled = true;
      return;
    }

    this.currentMatchDayId = matchDay.id;
    this.chosenMatchDay = matchDay;

    if (this.seasonData.isFinished || !this.seasonData.hasNoActiveMatchDay) {
      this.matchDayContentFrame.buttonDisabled = true;
    } else {
      this.matchDayContentFrame.buttonDisabled = false;
    }

    if (matchDay.isFinished) {
      this.matchContentFrame.buttonDisabled = true;
    } else {
      this.matchContentFrame.buttonDisabled = false;
    }
  }

  refreshTable() {
    this.seasonTableRef.initSeasonTable();
    this.matchDayStatsRef.matchDayTableRef.initMatchDayTable();
    this.matchDayStatsRef.matchDayPlayersRef.initMatchDayPlayers();
  }

  isNewMatchDayDisabled(): boolean {
    if (this.seasonData) {
      return this.seasonData.isFinished;
    }

    return false;
  }

  isNewMatchDisabled(): boolean {
    if (this.seasonData) {
      return this.seasonData.isFinished || this.seasonData.hasNoActiveMatchDay;
    }
    return false;
  }

  takeNewMatchDayId(): void {
    this.matchDayContentFrame.buttonDisabled = true;
    this.matchListRef.getMatchDayList(this.seasonId);
  }

  takeFinishedMatchDayId(): void {
    this.matchDayContentFrame.buttonDisabled = false;
    this.matchListRef.getMatchDayList(this.seasonId); ///dopisać do tego @Output w klasie match-day-stats
  }
}
