import { Component, inject } from '@angular/core';
import { League } from 'src/app/model/league';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  leagueList: League[] = [];
  filteredLeagueList: League[] = [];
  isResponseComplete: boolean = false;
  noLeagueFoundFlag = false;
  noLeagueFoundText = 'Nie znaleziono ligi dla frazy: ';
  noLeagueFoundSearchValue = '';

  constructor(private leagueService: LeagueService) {
    this.leagueService.getAllLeagues().subscribe({
      next: (response) => {
        if (response.leagues != null) {
          this.leagueList = response.leagues;
          this.filteredLeagueList = response.leagues;
        }
      },
      complete: () => {
        this.isResponseComplete = true;
      },
    });
  }

  takeSearchValue(searchText: string) {
    if (searchText.length > 0) {
      this.filteredLeagueList = this.leagueList.filter((league) =>
        league?.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.filteredLeagueList = this.leagueList;
    }
    if (this.filteredLeagueList.length == 0) {
      this.noLeagueFoundSearchValue = searchText;
      this.noLeagueFoundFlag = true;
    } else {
      this.noLeagueFoundFlag = false;
    }
  }
}
