import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NewPlayer } from 'src/app/services/player.service';
import { NewPlayerComponent } from '../new-player/new-player.component';
import { ExistingPlayerComponent } from '../existing-player/existing-player.component';
import { SearchPlayerComponent } from '../search-player/search-player.component';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-new-league-player',
  templateUrl: './new-league-player.component.html',
  styleUrls: ['./new-league-player.component.css'],
})
export class NewLeaguePlayerComponent {
  @Output() outputPlayerForm = new EventEmitter<FormGroup>();

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { playerAliases: string[]; playerList: Player[] }
  ) {}

  openNewPlayerModal() {
    const dialogRef = this.dialog.open(NewPlayerComponent, {
      data: {
        playerAliases: this.data.playerAliases,
      },
      position: { top: '30px' },
      disableClose: true,
    });

    dialogRef.componentInstance.outputPlayerForm.subscribe((value) => {
      this.outputPlayerForm.emit(value);
      this.dialog.closeAll();
    });
  }

  openExistingPlayersModal() {
    const dialogRef = this.dialog.open(SearchPlayerComponent, {
      data: {
        playerAliases: this.data.playerAliases,
        playerList: this.data.playerList,
      },
      position: { top: '30px' },
      disableClose: true,
    });

    dialogRef.componentInstance.outputPlayerForm.subscribe((value) => {
      this.outputPlayerForm.emit(value);
      this.dialog.closeAll();
    });
  }
}
