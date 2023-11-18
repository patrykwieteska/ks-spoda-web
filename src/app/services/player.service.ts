import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { BASE_URL } from 'src/config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const serviceURL = '/players';
const baseURL = BASE_URL + serviceURL;

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  getPlayersByLeague(leagueId: number): Observable<GetPlayersResponse> {
    return this.http
      .get<GetPlayersResponse>(baseURL + '?leagueId=' + leagueId)
      .pipe(catchError(this.handleError));
  }

  getAllPlayers(): Observable<GetPlayersResponse> {
    return this.http
      .get<GetPlayersResponse>(baseURL)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured on client side:', error.error);
    } else {
      console.error('Backend returned code ${error.status}:', error.error);
    }

    return throwError(() => new Error('PlayerService error: ' + error.error));
  }
}

export interface GetPlayersResponse {
  status: number;
  players: Player[];
  message: string | null;
}
