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
import { LeagueDetailsComponent } from './components/league/league-details/league-details.component';
import { HelpDialogComponent } from './components/commons/help-dialog/help-dialog.component';
import { ExistingPlayerComponent } from './components/player/existing-player/existing-player.component';
import { HttpClientModule } from '@angular/common/http';
import { AddPlayersComponent } from './components/player/forms/add-players/add-players.component';
import { ErrorComponent } from './components/error/error.component';
import { NewPlayerComponent } from './components/player/new-player/new-player.component';

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
    LeagueDetailsComponent,
    HelpDialogComponent,
    ExistingPlayerComponent,
    AddPlayersComponent,
    ErrorComponent,
    NewPlayerComponent,
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
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl-PL' },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
