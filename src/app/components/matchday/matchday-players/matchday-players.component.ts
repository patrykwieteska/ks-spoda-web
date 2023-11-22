import { MatchDayPlayer } from './../../../services/match-day.service';
import { MatchDayService } from 'src/app/services/match-day.service';
import { Component, Input, OnInit } from '@angular/core';
import { SimpleMatchDay } from 'src/app/model/match-day';

@Component({
  selector: 'app-matchday-players',
  templateUrl: './matchday-players.component.html',
  styleUrls: ['./matchday-players.component.css'],
})
export class MatchdayPlayersComponent implements OnInit {
  constructor(private matchDayService: MatchDayService) {}

  players: MatchDayPlayer[] = [];

  ngOnInit(): void {
    this.initMatchDayPlayers();
  }
  initMatchDayPlayers() {
    this.matchDayService.getPlayerMatchDay(this.inputMaatchDay.id).subscribe({
      next: (response) => {
        this.players = response.matchDayPlayers;
      },
      complete: () => {},
    });
  }
  @Input() inputMaatchDay!: SimpleMatchDay;
}
