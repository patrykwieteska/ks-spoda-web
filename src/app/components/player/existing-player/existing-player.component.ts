import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player, PlayerList } from 'src/app/model/player';

@Component({
  selector: 'app-existing-player',
  templateUrl: './existing-player.component.html',
  styleUrls: ['./existing-player.component.css'],
})
export class ExistingPlayerComponent {
  apiPlayers: Player[] = [];
  addedEarlier: Player[] = [];
  readyToAdd: Player[] = [];
  addedPlayerList: Player[] = [];
  filteredPlayerList: Player[] = [];
  isApiResponseComplete: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ExistingPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlayerList
  ) {
    dialogRef.disableClose = true;
    this.addedEarlier = data.playerList;
    this.apiPlayers = data.apiPlayerList;
    this.readyToAdd = getFilteredApiPlayers(this.apiPlayers, this.addedEarlier);
  }

  @Output() outputPlayerList = new EventEmitter<Player[]>();

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmPlayerList(): void {
    this.outputPlayerList.emit(this.addedPlayerList);
  }

  addPlayer(player: Player) {
    this.addedPlayerList.push(player);
    this.filteredPlayerList = [];
    this.removePlayerFromList(player, this.readyToAdd);
    this.clearFilter();
    (document.getElementById('player-filter') as HTMLInputElement).focus();
  }

  removePlayer(playerToRemove: Player) {
    this.removePlayerFromList(playerToRemove, this.addedPlayerList);
    this.readyToAdd.push(playerToRemove);
  }

  removePlayerFromList(playerToRemove: Player, playerList: Player[]) {
    const index = playerList.indexOf(playerToRemove);
    if (index >= 0) {
      playerList.splice(index, 1);
    }
  }

  filterResults() {
    let text = (document.getElementById('player-filter') as HTMLInputElement)
      .value;
    if (!text) {
      this.filteredPlayerList = [];
    }

    if (text.length > 0) {
      this.filteredPlayerList = this.readyToAdd.filter(
        (player) =>
          player?.alias.toLowerCase().includes(text.toLowerCase()) ||
          player?.name.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.filteredPlayerList = [];
    }
  }
  prepareData(): Player[] {
    let result = new Array<Player>();

    this.apiPlayers.forEach((player) => {
      if (
        !this.addedEarlier.includes(player) &&
        !this.addedPlayerList.includes(player)
      ) {
        result.push(player);
      }
    });

    return result;
  }

  disabled(): boolean {
    return this.addedPlayerList.length == 0 || this.apiPlayers.length == 0;
  }

  clearFilter(): void {
    (document.getElementById('player-filter') as HTMLInputElement).value = '';
  }
}

function isPlayerAddedEarlier(addedEarlier: Player[], player: Player): boolean {
  return addedEarlier.includes(player);
}
function getFilteredApiPlayers(
  apiPlayers: Player[],
  addedEarlier: Player[]
): Player[] {
  let result: Player[] = new Array<Player>();
  apiPlayers.forEach((apiPlayer) => {
    if (!isPlayerAddedEarlier(addedEarlier, apiPlayer)) {
      result.push(apiPlayer);
    }
  });
  return result;
}
