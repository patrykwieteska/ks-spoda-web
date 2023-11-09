import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-league',
  templateUrl: './search-league.component.html',
  styleUrls: ['./search-league.component.css'],
})
export class SearchLeagueComponent {
  searchText = ' Wyszukaj ligę';

  @Output() searchValueEmitter = new EventEmitter<string>();

  searchLeague(searchText: string): void {
    this.searchValueEmitter.emit(searchText);
    (document.getElementById('search-text') as HTMLInputElement).value = '';
  }
}
