import { PlayerService } from 'src/app/services/player.service';
import { Component, Input } from '@angular/core';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css'],
})
export class PlayerDetailsComponent {
  @Input() chosenPlayer!: Player | null;

  constructor(private playerService: PlayerService) {}

  closePlayerDetails() {
    this.chosenPlayer = null;
  }

  getPlayerImg(playerImg: string | null) {
    return this.playerService.getPlayerImg(playerImg);
  }
}
