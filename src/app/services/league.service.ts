import { LeagueTable, LeagueTableRow } from './../model/league';
import { Injectable } from '@angular/core';
import { League, NewLeague } from '../model/league';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BASE_URL } from 'src/config';
import { InitLeagueResponse } from '../model/init-league-response';

const serviceURL = '/leagues';
const baseURL = BASE_URL + serviceURL;

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  leagueTable: LeagueTableRow[] = [];

  getCurrentSeasonTable(leagueId: number): LeagueTableRow[] {
    return this.leagueTable;
  }

  initLeagueById(leagueId: number): Observable<InitLeagueResponse> {
    return this.http
      .get<InitLeagueResponse>(baseURL + '/init/' + leagueId)
      .pipe(catchError(this.handleError));
  }

  getAllLeagues(): Observable<GetAllLeaguesResponse> {
    return this.http
      .get<GetAllLeaguesResponse>(baseURL)
      .pipe(catchError(this.handleError));
  }

  createLeague(leagueData: NewLeague): Observable<NewLeague> {
    console.log(leagueData);

    return this.http.post<NewLeague>(baseURL, leagueData).pipe();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured on client side:', error.error);
    } else {
      console.error('Backend returned code:', error.status, error.error);
    }

    return throwError(() => new Error('LeagueService error: ' + error.message));
  }

  constructor(private http: HttpClient) {
    this.leagueTable = LEAGUE_TABLE_TEST_DATA;
  }
}

export interface GetAllLeaguesResponse {
  status: number;
  leagues: League[] | null;
  message: string | null;
}

const LEAGUE_TABLE_TEST_DATA: LeagueTableRow[] = [
  {
    player: {
      id: 1,
      name: 'Mateusz',
      alias: 'Jałyj',
      playerImg: null,
      desc: null,
      joinDate: new Date(2020, 11, 22),
    },
    rating: 1200,
    pointsTotal: 0,
    pointsPerMatch: 0,
    matches: 4,
    wins: 3,
    draws: 1,
    loses: 0,
    goalsScored: 12,
    goalsConceded: 4,
    goalsDiff: 2,
    form: ['Z', 'Z', 'Z', 'R'],
  },
  {
    player: {
      id: 2,
      name: 'Jakub',
      alias: 'Niedziej',
      playerImg: null,
      desc: null,
      joinDate: new Date(2020, 11, 22),
    },
    rating: 1141,
    pointsTotal: 0,
    pointsPerMatch: 0,
    matches: 4,
    wins: 2,
    draws: 2,
    loses: 0,
    goalsScored: 5,
    goalsConceded: 1,
    goalsDiff: 2,
    form: ['R', 'Z', 'Z', 'R'],
  },
  {
    player: {
      id: 3,
      name: 'Rafał',
      alias: 'Rafył',
      playerImg: null,
      desc: null,
      joinDate: new Date(2020, 11, 22),
    },
    rating: 1023,
    pointsTotal: 0,
    pointsPerMatch: 0,
    matches: 4,
    wins: 2,
    draws: 1,
    loses: 1,
    goalsScored: 5,
    goalsConceded: 1,
    goalsDiff: 2,
    form: ['Z', 'Z', 'P', 'R'],
  },
  {
    player: {
      id: 4,
      name: 'Patryk',
      alias: 'Wietek',
      playerImg: null,
      desc: 'Opis pewnej biurwy',
      joinDate: new Date(2020, 11, 22),
    },
    rating: 957,
    pointsTotal: 0,
    pointsPerMatch: 0,
    matches: 4,
    wins: 0,
    draws: 1,
    loses: 2,
    goalsScored: 5,
    goalsConceded: 1,
    goalsDiff: 2,
    form: ['P', 'P', 'R'],
  },
  {
    player: {
      id: 5,
      name: 'Marek',
      alias: 'WlodzimierzCzarzasty',
      playerImg: null,
      desc: null,
      joinDate: new Date(2020, 11, 22),
    },
    rating: 912,
    pointsTotal: 0,
    pointsPerMatch: 0,
    matches: 4,
    wins: 0,
    draws: 0,
    loses: 3,
    goalsScored: 0,
    goalsConceded: 9,
    goalsDiff: 2,
    form: ['P', 'P', 'P'],
  },
  {
    player: {
      id: 6,
      name: 'Jakub',
      alias: 'Skun',
      playerImg: null,
      desc: null,
      joinDate: new Date(2020, 11, 22),
    },
    rating: 833,
    pointsTotal: 0,
    pointsPerMatch: 0,
    matches: 4,
    wins: 0,
    draws: 0,
    loses: 4,
    goalsScored: 0,
    goalsConceded: 12,
    goalsDiff: 2,
    form: ['P', 'P', 'P', 'P'],
  },
];
