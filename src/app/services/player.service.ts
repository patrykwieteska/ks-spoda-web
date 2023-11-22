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

  addPlayer(newPlayer: NewPlayer): Observable<PlayerCreated> {
    return this.http.post<PlayerCreated>(baseURL + '/create', newPlayer).pipe();
  }

  getLeaguePlayersBySeason(seasonId: number): Observable<GetPlayersResponse> {
    return this.http
      .get<GetPlayersResponse>(baseURL + '/league' + '?seasonId=' + seasonId)
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

  getPlayerImg(src: string | null): string {
    return src ? src : '../../../../assets/default_player_logo.png';
  }
}

export interface GetPlayersResponse {
  status: number;
  players: Player[];
  message: string | null;
}

export interface PlayerCreated {
  id: number;
  status: number;
  message: string | null;
}

export interface NewPlayer {
  name: string;
  alias: string;
  leagueId: number;
  playerImg: string;
}
