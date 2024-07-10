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
import { GroupsComponent } from '../../euro/groups/groups.component';

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
  seasonReady: boolean = false;
  playedTeams: number[] = [];
  newMatchDayButtonDisabled: boolean = true;
  newMatchButtonDisabled: boolean = true;

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
  @ViewChild('euroGroupsRef') euroGroupsRef!: GroupsComponent;

  constructor(
    private location: Location,
    private seasonService: SeasonService
  ) {
    this.seasonId = this.route.snapshot.params['seasonId'];
    console.log('SEASON ID READY');
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
        console.log('SEASON ID =', this.seasonId);
        this.isNewMatchDisabled();
        this.seasonReady = true;

        if (!this.chosenMatchDay) {
          this.newMatchDayButtonDisabled = false;
          this.newMatchButtonDisabled = true;
        }
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
      name = seasonName;
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
      this.newMatchDayButtonDisabled = true;
      this.matchContentFrame.buttonDisabled = true;
      return;
    }
    console.log('MATCHDAY LOG', matchDay);

    this.currentMatchDayId = matchDay.id;
    this.chosenMatchDay = matchDay;

    if (this.seasonData.isFinished) {
      this.newMatchDayButtonDisabled = true;
    } else if (
      (!matchDay.isFinished && this.seasonData.hasNoActiveMatchDay) ||
      (matchDay.isFinished && !this.seasonData.hasNoActiveMatchDay) ||
      !matchDay.isFinished
    ) {
      this.newMatchDayButtonDisabled = true;
    } else {
      this.newMatchDayButtonDisabled = false;
    }

    if (matchDay.isFinished) {
      this.newMatchButtonDisabled = true;
    } else {
      this.newMatchButtonDisabled = false;
    }
  }

  refreshTable(isMatchComplete: boolean) {
    this.seasonTableRef.initSeasonTable();
    this.matchDayStatsRef.matchDayTableRef.initMatchDayTable();
    this.matchDayStatsRef.matchDayPlayersRef.initMatchDayPlayers();
    console.log('isMatchComplete', isMatchComplete);
    if (isMatchComplete) {
      this.matchContentFrame.buttonDisabled = false;
    } else {
      this.matchContentFrame.buttonDisabled = true;
    }

    if (this.seasonData.isEuro) {
      this.euroGroupsRef.refreshData();
    }
  }

  isNewMatchDisabled(): void {
    if (this.seasonData) {
      this.newMatchButtonDisabled =
        this.seasonData.isFinished || this.seasonData.hasNoActiveMatchDay;
    }
    this.newMatchButtonDisabled = false;
  }

  takeNewMatchDayId(): void {
    this.matchDayContentFrame.buttonDisabled = true;
    this.newMatchButtonDisabled = false;
    this.matchListRef.getMatchDayList(this.seasonId);
  }

  takeFinishedMatchDayId(): void {
    this.matchDayContentFrame.buttonDisabled = false;
    this.matchListRef.getMatchDayList(this.seasonId); ///dopisać do tego @Output w klasie match-day-stats
    this.newMatchButtonDisabled = true;
  }

  takePlayedEuroTeams(value: number[]) {
    console.log('changes');
    this.playedTeams = value;
  }

  takeFinishMatchDayOutput() {}
}
