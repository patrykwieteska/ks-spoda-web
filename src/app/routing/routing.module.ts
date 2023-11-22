import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../components/home/home.component';
import { AboutComponent } from '../components/about/about.component';
import { CreateLeagueComponent } from '../components/league/create-league/create-league.component';
import { InitLeagueComponent } from '../components/league/init-league/init-league.component';
import { PageNotFoundComponent } from '../components/commons/page-not-found/page-not-found.component';
import { InitSeasonComponent } from '../components/season/init-season/init-season.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'leagues/init/:leagueId', component: InitLeagueComponent },
  { path: 'leagues/create', component: CreateLeagueComponent },
  { path: 'season/init/:seasonId', component: InitSeasonComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
