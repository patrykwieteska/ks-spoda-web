import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { BASE_URL } from 'src/config';
import { Season, SeasonListResponse } from '../model/season';
import { HttpClient } from '@angular/common/http';

const serviceURL = '/seasons';
const baseURL = BASE_URL + serviceURL;

@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  constructor(private http: HttpClient) {}

  getSeasonsByLeagueId(leagueId: number): Observable<SeasonListResponse> {
    return this.http
      .get<SeasonListResponse>(baseURL + '?leagueId=' + leagueId)
      .pipe();
  }

  createSeason(season: Season): Observable<Season> {
    return this.http.post<Season>(baseURL, season).pipe();
  }

  completeSeason(seasonId: number): Observable<{ seasonId: number }> {
    return this.http
      .put<{ seasonId: number }>(baseURL + '/complete', { seasonId: seasonId })
      .pipe();
  }
}
