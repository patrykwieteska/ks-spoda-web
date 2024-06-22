import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { EuroGroupTeam } from 'src/app/model/euro';

@Component({
  selector: 'app-euro-group-table',
  templateUrl: './euro-group-table.component.html',
  styleUrls: ['./euro-group-table.component.css'],
})
export class EuroGroupTableComponent {
  @Input() euroTeams!: EuroGroupTeam[];
  @Input() playedTeams: number[] = [];
  prepareClass(groupPosition: number): string {
    const base = 'position-';
    return base + groupPosition;
  }

  isTeamPlaying(teamId: number): boolean {
    return this.playedTeams.includes(teamId);
  }
}
