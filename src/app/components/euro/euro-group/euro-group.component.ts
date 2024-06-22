import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EuroGroup, EuroGroupTeam, EuroMatch } from 'src/app/model/euro';
import { EuroService } from 'src/app/services/euro-service.service';

@Component({
  selector: 'app-euro-group',
  templateUrl: './euro-group.component.html',
  styleUrls: ['./euro-group.component.css'],
})
export class EuroGroupComponent implements OnInit {
  @Input() group!: EuroGroup;
  @Input() seasonId!: number;
  @Input() playedTeams: number[] = [];
  teams: EuroGroupTeam[] = [];
  matches: EuroMatch[] = [];

  constructor(private euroService: EuroService) {}

  ngOnInit(): void {
    this.teams = this.group.teams;
    this.euroService
      .getEuroCalendar(this.group.groupCode, this.seasonId)
      .subscribe({
        next: (response) => {
          this.matches = response.euroMatches;
        },
      });
  }

  @ViewChild('elementToScroll', { static: true })
  sectionSubscribeDiv!: ElementRef;
}
