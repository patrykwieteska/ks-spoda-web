import { Component, Input } from '@angular/core';
import {
  MatchDayPlayer,
  MatchDayPlayerRow,
} from 'src/app/services/match-day.service';

@Component({
  selector: 'app-matchday-player-details',
  templateUrl: './matchday-player-details.component.html',
  styleUrls: ['./matchday-player-details.component.css'],
})
export class MatchdayPlayerDetailsComponent {
  @Input() matchDayPlayer!: MatchDayPlayer;

  getClass(mdPlayerRow: MatchDayPlayerRow): string {
    if (mdPlayerRow.isHighest == mdPlayerRow.isLowest) {
      return '';
    }

    return mdPlayerRow.isLowest == true
      ? 'lowest'
      : mdPlayerRow.isHighest == true
      ? 'highest'
      : '';
  }
}
