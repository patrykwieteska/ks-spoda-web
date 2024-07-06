import { ErrorHandlerService } from './services/error-handler.service';
import { HeaderComponent } from './components/navigation/header/header.component';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './components/home/home.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { AboutComponent } from './components/about/about.component';
import { SearchLeagueComponent } from './components/league/search-league/search-league.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import '@angular/common/locales/global/pl';
import { LOCALE_ID } from '@angular/core';
import { LeagueItemComponent } from './components/league/league-item/league-item.component';
import { CreateLeagueComponent } from './components/league/create-league/create-league.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelpDialogComponent } from './components/commons/help-dialog/help-dialog.component';
import { ExistingPlayerComponent } from './components/player/existing-player/existing-player.component';
import { HttpClientModule } from '@angular/common/http';
import { AddPlayersComponent } from './components/player/forms/add-players/add-players.component';
import { ErrorComponent } from './components/error/error.component';
import { NewPlayerComponent } from './components/player/new-player/new-player.component';
import { InitLeagueComponent } from './components/league/init-league/init-league.component';
import { PageNotFoundComponent } from './components/commons/page-not-found/page-not-found.component';
import { CustomProgressBarComponent } from './components/commons/custom-progress-bar/custom-progress-bar.component';
import { ContentFrameComponent } from './components/commons/content-frame/content-frame.component';
import { HeaderPanelComponent } from './components/commons/header-panel/header-panel.component';
import { LeagueNewsComponent } from './components/league/league-news/league-news.component';
import { TableComponent } from './components/league/table/table.component';
import { MatchItemComponent } from './components/match/match-item/match-item.component';
import { SeasonListComponent } from './components/season/season-list/season-list.component';
import { StatisticsComponent } from './components/league/statistics/statistics.component';
import { PlayerDetailsComponent } from './components/player/player-details/player-details.component';
import { PlayerListComponent } from './components/player/player-list/player-list.component';
import { PlayerItemComponent } from './components/player/player-item/player-item.component';
import { MatchListComponent } from './components/match/match-list/match-list.component';
import { SeasonItemComponent } from './components/season/season-item/season-item.component';
import { NewSeasonComponent } from './components/season/new-season/new-season.component';
import { InitSeasonComponent } from './components/season/init-season/init-season.component';
import { SeasonTableComponent } from './components/season/season-table/season-table.component';
import { MatchdayTableComponent } from './components/matchday/matchday-table/matchday-table.component';
import { MatchdayStatsComponent } from './components/matchday/matchday-stats/matchday-stats.component';
import { NewMatchComponent } from './components/match/new-match/new-match.component';
import { GameTeamSearchComponent } from './components/match/game-team-search/game-team-search.component';
import { MatchPlayersComponent } from './components/match/match-players/match-players.component';
import { NewMatchdayComponent } from './components/matchday/new-matchday/new-matchday.component';
import { DeleteMatchComponent } from './components/match/delete-match/delete-match.component';
import { MatchdayPlayersComponent } from './components/matchday/matchday-players/matchday-players.component';
import { MatchdayPlayerDetailsComponent } from './components/matchday/matchday-player-details/matchday-player-details.component';
import { EuroCalendarComponent } from './components/euro/euro-calendar/euro-calendar.component';
import { NewEuroMatchComponent } from './components/euro/new-euro-match/new-euro-match.component';
import { EuroMatchPlayersComponent } from './components/euro/euro-match-players/euro-match-players.component';
import { GroupsComponent } from './components/euro/groups/groups.component';
import { EuroGroupComponent } from './components/euro/euro-group/euro-group.component';
import { EuroMatchItemComponent } from './components/euro/euro-match-item/euro-match-item.component';
import { EuroGroupTableComponent } from './components/euro/euro-group-table/euro-group-table.component';
import { ThirdPlacesTableComponent } from './components/euro/third-places-table/third-places-table.component';
import { EuroPlayoffMatchListComponent } from './components/euro/euro-playoff-match-list/euro-playoff-match-list.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe, NgForOf } from '@angular/common';
import { PlayerDetailsEditComponent } from './components/player/player-details-edit/player-details-edit.component';
import { StatsPanelComponent } from './components/stats-panel/stats-panel.component';
import { MatchCommentsComponent } from './components/match/match-comments-dialog/match-comments-dialog.component';
import { TestComponent } from './components/test/test.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { LoaderCircleComponent } from './components/commons/loader-circle/loader-circle.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidenavListComponent,
    AboutComponent,
    SearchLeagueComponent,
    LeagueItemComponent,
    CreateLeagueComponent,
    HelpDialogComponent,
    ExistingPlayerComponent,
    AddPlayersComponent,
    ErrorComponent,
    NewPlayerComponent,
    InitLeagueComponent,
    PageNotFoundComponent,
    CustomProgressBarComponent,
    ContentFrameComponent,
    HeaderPanelComponent,
    LeagueNewsComponent,
    MatchItemComponent,
    SeasonListComponent,
    StatisticsComponent,
    TableComponent,
    PlayerDetailsComponent,
    PlayerListComponent,
    PlayerItemComponent,
    MatchListComponent,
    SeasonItemComponent,
    NewSeasonComponent,
    InitSeasonComponent,
    SeasonTableComponent,
    MatchdayTableComponent,
    MatchdayStatsComponent,
    NewMatchComponent,
    GameTeamSearchComponent,
    MatchPlayersComponent,
    NewMatchdayComponent,
    DeleteMatchComponent,
    MatchdayPlayersComponent,
    MatchdayPlayerDetailsComponent,
    EuroCalendarComponent,
    NewEuroMatchComponent,
    EuroMatchPlayersComponent,
    GroupsComponent,
    EuroGroupComponent,
    EuroMatchItemComponent,
    EuroGroupTableComponent,
    ThirdPlacesTableComponent,
    EuroPlayoffMatchListComponent,
    PlayerDetailsEditComponent,
    StatsPanelComponent,
    MatchCommentsComponent,
    TestComponent,
    FooterComponent,
    LoaderCircleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgForOf,
    DatePipe,
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pl-PL' },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
