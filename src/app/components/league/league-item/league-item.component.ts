import { Component, Input } from '@angular/core';
import { League } from 'src/app/model/league';

@Component({
  selector: 'app-league-item',
  templateUrl: './league-item.component.html',
  styleUrls: ['./league-item.component.css'],
})
export class LeagueItemComponent {
  @Input() league!: League;

  constructor() {
    //  if (data?.message) this.message = data.message;
  }

  getTypeIcon(leagueType: string): string {
    return leagueType === 'SEASON' ? 'table_chart' : 'emoji_events';
  }

  getTooltipMessage(leagueType: string): string {
    return leagueType === 'SEASON' ? 'Sezon ligowy' : 'Rozgrywki pucharowe';
  }
}
