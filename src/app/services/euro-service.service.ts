import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BASE_URL } from 'src/config';
import { EuroMatch, NewEuroMatch } from '../model/euro';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const baseURL = BASE_URL + '/euro';

@Injectable({
  providedIn: 'root',
})
export class EuroService {
  constructor(private http: HttpClient) {}

  getNextEuroMatch(): Observable<EuroMatch> {
    return this.http
      .get<EuroMatch>(baseURL + '/next-match')
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
