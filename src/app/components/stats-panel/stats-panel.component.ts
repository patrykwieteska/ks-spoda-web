import { MatchPlayers, MatchesStats } from './../../services/match-day.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-panel',
  templateUrl: './stats-panel.component.html',
  styleUrls: ['./stats-panel.component.css'],
})
export class StatsPanelComponent {
  @Input() matchesStats!: MatchesStats | null;
  @Input() title!: string;

  prepareTooltip(matchPlayers: MatchPlayers | null) {
    if (matchPlayers) {
      return matchPlayers.players.join(', ');
    }

    return '';
  }
}
