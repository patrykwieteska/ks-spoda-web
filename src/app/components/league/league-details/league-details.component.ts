import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.css'],
})
export class LeagueDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  leagueId = -1;
  constructor() {
    this.leagueId = Number(this.route.snapshot.params['leagueId']);
  }
}
