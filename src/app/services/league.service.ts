import { Injectable } from '@angular/core';
import { League, NewLeague } from '../model/league';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BASE_URL } from 'src/config';
import { InitLeagueResponse } from '../model/init-league-response';
import { Player } from '../model/player';
const serviceURL = '/leagues';
const baseURL = BASE_URL + serviceURL;

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
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

  constructor(private http: HttpClient) {}
}

export interface GetAllLeaguesResponse {
  status: number;
  leagues: League[] | null;
  message: string | null;
}
