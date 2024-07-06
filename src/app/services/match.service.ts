import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BASE_URL } from 'src/config';
import {
  EditMatch,
  GameTeam,
  Match,
  MatchComment,
  NewMatch,
} from '../model/match';

const serviceURL = '/matches';
const baseURL = BASE_URL + serviceURL;

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  uploadComments(matchId: number): Observable<MatchCommentsResponse> {
    return this.http
      .get<MatchCommentsResponse>(baseURL + '/comments/' + matchId)
      .pipe();
  }
  removeMatch(matchId: number): Observable<NewMatchResponse> {
    return this.http
      .delete<NewMatchResponse>(baseURL + '/remove-match?matchId=' + matchId)
      .pipe();
  }

  updateMatch(editMatch: EditMatch): Observable<NewMatchResponse> {
    return this.http
      .post<NewMatchResponse>(
        baseURL + '/edit-match?matchId=' + editMatch.matchId,
        editMatch
      )
      .pipe();
  }

  getAvailableGameTeams(
    matchDayId: number
  ): Observable<AvailableGameTeamsResponse> {
    console.log('MATCH_DAY_ID ' + matchDayId);
    return this.http
      .get<AvailableGameTeamsResponse>(
        baseURL + '/initGameTeams?matchDayId=' + matchDayId
      )
      .pipe();
  }

  createMatch(newMatch: NewMatch): Observable<NewMatchResponse> {
    return this.http
      .post<NewMatchResponse>(baseURL + '/create-match', newMatch)
      .pipe();
  }

  getMatchDayMatches(matchDayId: number): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(
        baseURL + '/getMatchDayMatches?matchDayId=' + matchDayId
      )
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

  getMatchDayMatchesMock(matchDayId: number): Observable<ApiResponse> {
    var _jsonURL = '/assets/mock-services/getMatchDayMatches.json';
    return this.getJSON(_jsonURL);
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }
}

export interface ApiResponse {
  status: number;
  matchList: Match[];
  message: string | null;
}

export interface ApiMatchResponse {
  status: number;
  matchList: Match[];
}
export interface NewMatchResponse {
  status: number;
  matchId: number;
  message: string | null;
}

export interface AvailableGameTeamsResponse {
  status: number;
  gameTeams: GameTeam[];
  message: string | null;
}

export interface MatchCommentsResponse {
  status: number;
  comments: MatchComment[];
  message: string | null;
}
