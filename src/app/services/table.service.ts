import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/config';
import { Observable } from 'rxjs';
import { Table } from '../model/table';

const serviceURL = '/table';
const baseURL = BASE_URL + serviceURL;

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient) {}

  initLeagueTable(leagueId: number): Observable<Table> {
    return this.http
      .get<Table>(baseURL + '/initLeagueTable?leagueId=' + leagueId)
      .pipe();
  }

  initSeasonTable(seasonId: number): Observable<Table> {
    return this.http
      .get<Table>(baseURL + '/initSeasonTable?seasonId=' + seasonId)
      .pipe();
  }

  initMatchDayTable(matchDayId: number): Observable<Table> {
    return this.http
      .get<Table>(baseURL + '/initMatchDayTable?matchDayId=' + matchDayId)
      .pipe();
  }
}
