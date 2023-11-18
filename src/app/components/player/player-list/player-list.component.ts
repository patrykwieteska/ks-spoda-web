import { PlayerService } from './../../../services/player.service';
import { Component, Input } from '@angular/core';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
export class PlayerListComponent {
  @Input() chosenPlayer!: Player | null;
  @Input() playerList: Player[] | null = [];

  takeEmittedPlayer(player: Player | null) {
    this.chosenPlayer = player;
  }
}
