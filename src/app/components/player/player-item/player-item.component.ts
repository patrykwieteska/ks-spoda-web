import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css'],
})
export class PlayerItemComponent {
  @Input() player!: Player;
  @Output() emittedPlayer = new EventEmitter<Player | null>();

  emitPlayer() {
    this.emittedPlayer.emit(this.player);
  }
}
