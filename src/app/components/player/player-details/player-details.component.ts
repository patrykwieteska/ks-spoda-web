import { PlayerService } from 'src/app/services/player.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css'],
})
export class PlayerDetailsComponent implements OnChanges {
  @Input() chosenPlayer!: Player | null;
  editModeEnabled: boolean = false;

  constructor(private playerService: PlayerService) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('PLAYER DETAILS CHANGES', changes);
  }

  enableEditMode() {
    this.editModeEnabled = true;
  }

  closePlayerDetails() {
    this.chosenPlayer = null;
  }

  getPlayerImg(playerImg: string | null) {
    return this.playerService.getPlayerImg(playerImg);
  }

  closeEditMode() {
    this.editModeEnabled = false;
  }
}
