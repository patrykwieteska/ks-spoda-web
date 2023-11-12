import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Player } from 'src/app/model/player';
import { ExistingPlayerComponent } from '../../existing-player/existing-player.component';
import { NewPlayerComponent } from '../../new-player/new-player.component';

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.css'],
})
export class AddPlayersComponent implements OnChanges {
  playersDataForm: FormGroup;
  existingPlayers: Player[] = [];
  newPlayers: Player[] = [];

  preparePlayer(player: Player): FormGroup {
    return new FormGroup({
      alias: new FormControl(player.alias),
      name: new FormControl(player.name),
      id: new FormControl(player.id),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.exportPlayersForm.emit(this.playersDataForm);
  }

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.playersDataForm = this.formBuilder.group({
      playerList: this.formBuilder.array([], [Validators.required]),
    });
  }

  @Input() apiPlayerList!: Player[];
  @Output() exportPlayersForm = new EventEmitter<FormGroup>();

  openExistingPlayersModal(): void {
    const dialogRef = this.dialog.open(ExistingPlayerComponent, {
      data: {
        playerList: this.existingPlayers,
        apiPlayerList: this.apiPlayerList,
      },
      position: { top: '30px' },
      disableClose: true,
    });

    dialogRef.componentInstance.outputPlayerList.subscribe(() => {
      const addedPlayerList = dialogRef.componentInstance.addedPlayerList;
      addedPlayerList.forEach((player) => {
        this.playerList.push(this.preparePlayer(player));
        this.existingPlayers.push(player);
      });
    });
  }

  openNewPlayerModal(): void {
    let playerAliases = this.apiPlayerList
      .concat(this.newPlayers)
      .map((player) => {
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
      this.playerList.push(value);
      let player: Player = {
        id: null,
        name: value.get('name')?.value,
        alias: value.get('alias')?.value,
        playerImg: value.get('playerImg')?.value,
      };
      this.newPlayers.push(player);
      dialogRef.close(() => {
        console.log('Dialog closed');
      });
    });
  }

  removeExistingPlayer(playerIndex: number, player: Player) {
    this.playerList.removeAt(playerIndex);
    this.removePlayer(player);
  }

  removePlayer(playerToRemove: Player) {
    this.removePlayerFromList(playerToRemove, this.existingPlayers);
    this.removePlayerFromList(playerToRemove, this.newPlayers);
  }

  removePlayerFromList(playerToRemove: Player, playerList: Player[]) {
    const index = playerList.indexOf(playerToRemove);
    if (index >= 0) {
      playerList.splice(index, 1);
    }
  }

  get playerList() {
    return this.playersDataForm.controls['playerList'] as FormArray;
  }

  get finalPlayerList(): Player[] {
    return this.existingPlayers.concat(this.newPlayers);
  }
}
