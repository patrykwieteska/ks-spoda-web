import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Match } from '../model/match';
import { BASE_URL } from 'src/config';
import { NewMatchDay, SimpleMatchDay } from '../model/match-day';

const serviceURL = '/match-days';
const baseURL = BASE_URL + serviceURL;

@Injectable({
  providedIn: 'root',
})
export class MatchDayService {
  getPlayerMatchDay(matchDayId: number): Observable<PlayerMatchDayResponse> {
    return this.http
      .get<PlayerMatchDayResponse>(
        baseURL + '/players?matchDayId=' + matchDayId
      )
      .pipe(catchError(this.handleError));
  }

  complete(matchDayId: number): Observable<CreatedMatchDayResponse> {
    return this.http
      .put<CreatedMatchDayResponse>(baseURL + '/complete', {
        matchDayId: matchDayId,
      })
      .pipe();
  }

  createMatchDay(matchDay: NewMatchDay): Observable<CreatedMatchDayResponse> {
    return this.http.post<CreatedMatchDayResponse>(baseURL, matchDay).pipe();
  }

  getMatchDayList(seasonId: number): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(baseURL + '/list?seasonId=' + seasonId)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured on client side:', error.error);
    } else {
      console.error('Backend returned code:', error.status, error.error);
    }

    return throwError(() => new Error('MatchService error: ' + error.message));
  }

  constructor(private http: HttpClient) {}
}

export interface ApiResponse {
  status: number;
  matchDays: SimpleMatchDay[];
  message: string | null;
}
export interface CreatedMatchDayResponse {
  status: number;
  matchDayId: number;
  message: string | null;
}

export interface PlayerMatchDayResponse {
  matchDayPlayers: MatchDayPlayer[];
}

export interface MatchDayPlayer {
  alias: string;
  opponents: MatchDayPlayerRow[];
  matchesInRow: number;
  teammates: MatchDayPlayerRow[];
}

export interface MatchDayPlayerRow {
  alias: string;
  value: number;
  isHighest: boolean | null;
  isLowest: boolean | null;
}
