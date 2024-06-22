import { Player } from 'src/app/model/player';
import { MatchDayPlayer } from './../../../services/match-day.service';
import { MatchDayService } from 'src/app/services/match-day.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SimpleMatchDay } from 'src/app/model/match-day';

@Component({
  selector: 'app-matchday-players',
  templateUrl: './matchday-players.component.html',
  styleUrls: ['./matchday-players.component.css'],
})
export class MatchdayPlayersComponent implements OnInit, OnChanges {
  constructor(private matchDayService: MatchDayService) {}

  players: MatchDayPlayer[] = [];
  chosenPlayer: MatchDayPlayer | null = null;

  ngOnInit(): void {
    this.initMatchDayPlayers();
  }

  ngOnChanges(changes: SimpleChanges) {
    let matchDayChanges = changes['inputMatchDay'];

    if (matchDayChanges) {
      this.inputMatchDay = matchDayChanges.currentValue;
      this.initMatchDayPlayers();
    }
  }

  initMatchDayPlayers() {
    this.matchDayService.getPlayerMatchDay(this.inputMatchDay.id).subscribe({
      next: (response) => {
        this.players = response.matchDayPlayers;
        this.chosenPlayer = this.players[0];
      },
      complete: () => {},
    });
  }
  @Input() inputMatchDay!: SimpleMatchDay;

  getClass(player: MatchDayPlayer): string {
    let defaultClass = 'match-in-row-panel';
    let secondClass = player.matchesInRow === 0 ? ' zero-games-in-row' : '';
    let chosenClass = this.chosenPlayer === player ? ' chosen-style' : '';
    return defaultClass + chosenClass + secondClass;
  }

  choosePlayer(player: MatchDayPlayer): void {
    this.chosenPlayer = player;
  }
}
