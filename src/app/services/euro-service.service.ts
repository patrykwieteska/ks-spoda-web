import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BASE_URL } from 'src/config';
import {
  CurrentStage,
  EuroCalendarResponse,
  EuroGroupResponse,
  EuroMatch,
  EuroThirdPlacesResponse,
} from '../model/euro';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const baseURL = BASE_URL + '/euro';

@Injectable({
  providedIn: 'root',
})
export class EuroService {
  constructor(private http: HttpClient) {}

  getNextEuroMatch(seasonId: number): Observable<EuroMatch> {
    return this.http
      .get<EuroMatch>(baseURL + '/next-match/' + seasonId)
      .pipe(catchError(this.handleError));
  }

  getThirdPlacesTable(seasonId: number): Observable<EuroThirdPlacesResponse> {
    return this.http
      .get<EuroThirdPlacesResponse>(baseURL + '/third-places/' + seasonId)
      .pipe(catchError(this.handleError));
  }

  getCurrentStage(seasonId: number): Observable<CurrentStage> {
    return this.http
      .get<CurrentStage>(baseURL + '/current-stage/' + seasonId)
      .pipe(catchError(this.handleError));
  }

  getEuroGroups(seasonId: number): Observable<EuroGroupResponse> {
    return this.http
      .get<EuroGroupResponse>(baseURL + '/tables/' + seasonId)
      .pipe(catchError(this.handleError));
  }

  getEuroCalendar(
    stage: string,
    seasonId: number
  ): Observable<EuroCalendarResponse> {
    return this.http
      .get<EuroCalendarResponse>(
        baseURL + '/calendar/' + seasonId + '?stage=' + stage
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured on client side:', error.error);
    } else {
      console.error('Backend returned code:', error.status, error.error);
    }

    return throwError(() => new Error('LeagueService error: ' + error.message));
  }
}
