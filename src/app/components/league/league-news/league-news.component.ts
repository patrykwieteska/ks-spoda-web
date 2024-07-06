import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Player } from 'src/app/model/player';
import { TableComponent } from '../league-table/league-table.component';

@Component({
  selector: 'app-league-news',
  templateUrl: './league-news.component.html',
  styleUrls: ['./league-news.component.css'],
})
export class LeagueNewsComponent {
  tooltipMessage: string = 'Otwórz w nowym oknie';

  @Input() leagueId!: number;
  @Output() chosenPlayer = new EventEmitter<Player | null>();
  @ViewChild('leagueTableRef') leagueTableRef!: TableComponent;

  takeChosenPlayer(player: Player | null) {
    this.chosenPlayer.emit(player);
  }
}
