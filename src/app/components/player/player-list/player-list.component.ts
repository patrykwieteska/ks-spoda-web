import { NewPlayer, PlayerService } from './../../../services/player.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Player } from 'src/app/model/player';
import { NewPlayerComponent } from '../new-player/new-player.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
export class PlayerListComponent {
  @Input() chosenPlayer!: Player | null;
  @Input() playerList: Player[] | null = [];
  @Input() leagueId: number = -1;
  @Output() addedPlayerOutput = new EventEmitter<void>();

  takeEmittedPlayer(player: Player | null) {
    this.chosenPlayer = player;
  }

  constructor(public dialog: MatDialog, private playerService: PlayerService) {}

  addNewPlayer(): void {
    if (this.playerList == null) {
      return;
    }

    let playerAliases = this.playerList.map((player) => {
      return player.alias.toUpperCase();
    });

    const dialogRef = this.dialog.open(NewPlayerComponent, {
      data: {
        playerAliases: playerAliases,
      },
      position: { top: '30px' },
      disableClose: true,
    });

    dialogRef.componentInstance.outputPlayerForm.subscribe((value) => {
      let newPlayer: NewPlayer = {
        name: value.get('name')?.value,
        alias: value.get('alias')?.value,
        playerImg: value.get('playerImg')?.value,
        leagueId: this.leagueId,
      };

      this.playerService.addPlayer(newPlayer).subscribe({
        complete: () => {
          console.log('playerSaveComplete');
          this.addedPlayerOutput.emit();
          dialogRef.close(() => {
            console.log('Dialog closed hehe');
          });
        },
      });
    });
  }
}
