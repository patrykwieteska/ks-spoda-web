import { Injectable } from '@angular/core';
import { League, NewLeague } from '../model/league';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BASE_URL } from 'src/config';

const serviceURL = '/leagues';
const baseURL = BASE_URL + serviceURL;

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  initLeagueById(leagueId: number): League | undefined {
    return this.leagueList.find((league) => league.leagueId === leagueId);
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

  leagueList: League[] = [
    {
      name: 'Fifowa Śpoda',
      logoUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxiX_8goW5BX7dSlrRxNZM7f0jmIw3CeLmd00bUVQ-elqH0fEsngPCpcy3HX-vxBhu-Nk&usqp=CAU',
      leagueId: 1,
      description: null,
      teamStructure: 'DOUBLE',
      type: 'SEASON',
      creationDate: new Date('2023-10-10T00:00:00'),
    },
    {
      name: 'Wrocławski Squash',
      logoUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7N-tYIKpwoKhSBoCYXoxAQ0XJIdof0Ewv3kPUlnqLaw&s',
      leagueId: 2,
      description: 'Liga skłoszowska',
      teamStructure: 'SINGLE',
      type: 'SEASON',
      creationDate: new Date('2023-10-10T00:00:00'),
    },
    {
      name: 'Pisowska liga',
      logoUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ105HDR0YWtPnCHXcgLLWLxMmZ1OkRlXfxnA&usqp=CAU',
      leagueId: 3,
      description: 'Test test',
      teamStructure: 'DOUBLE',
      type: 'CUP',
      creationDate: new Date('2023-10-10T00:00:00'),
    },
  ];
}

export interface GetAllLeaguesResponse {
  status: number;
  leagues: League[] | null;
  message: string | null;
}
