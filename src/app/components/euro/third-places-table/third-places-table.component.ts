import { EuroService } from 'src/app/services/euro-service.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EuroGroupTeam } from 'src/app/model/euro';

@Component({
  selector: 'app-third-places-table',
  templateUrl: './third-places-table.component.html',
  styleUrls: ['./third-places-table.component.css'],
})
export class ThirdPlacesTableComponent implements OnInit {
  teams: EuroGroupTeam[] = [];
  @Input() seasonId!: number;
  @Input() playedTeams: number[] = [];
  constructor(private euroService: EuroService) {}
  ngOnInit(): void {
    this.refreshThirdPlaceTable();
  }

  public refreshThirdPlaceTable() {
    this.euroService.getThirdPlacesTable(this.seasonId).subscribe({
      next: (response) => {
        this.teams = response.teams;
      },
    });
  }

  prepareClass(groupPosition: number): string {
    if (groupPosition <= 4) {
      return 'position';
    }

    return '';
  }

  isTeamPlaying(teamId: number): boolean {
    return this.playedTeams.includes(teamId);
  }
}
