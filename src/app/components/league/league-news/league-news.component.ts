import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { LeagueTable } from 'src/app/model/league';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-league-news',
  templateUrl: './league-news.component.html',
  styleUrls: ['./league-news.component.css'],
})
export class LeagueNewsComponent {
  tooltipMessage: string = 'Otwórz w nowym oknie';

  @Input() leagueId!: number;
  @Output() chosenPlayer = new EventEmitter<Player | null>();
  @Input() leagueTable!: LeagueTable;

  takeChosenPlayer(player: Player | null) {
    this.chosenPlayer.emit(player);
  }
}
