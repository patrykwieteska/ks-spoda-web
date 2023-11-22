import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/model/player';
import { Table } from 'src/app/model/table';

@Component({
  selector: 'app-league-news',
  templateUrl: './league-news.component.html',
  styleUrls: ['./league-news.component.css'],
})
export class LeagueNewsComponent {
  tooltipMessage: string = 'Otwórz w nowym oknie';

  @Input() leagueId!: number;
  @Output() chosenPlayer = new EventEmitter<Player | null>();

  takeChosenPlayer(player: Player | null) {
    this.chosenPlayer.emit(player);
  }
}
