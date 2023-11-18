import { Component, Input } from '@angular/core';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css'],
})
export class PlayerDetailsComponent {
  @Input() chosenPlayer!: Player | null;

  closePlayerDetails() {
    this.chosenPlayer = null;
  }
}
