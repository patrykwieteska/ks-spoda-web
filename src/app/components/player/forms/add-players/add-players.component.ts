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

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.css'],
})
export class AddPlayersComponent implements OnChanges {
  playersDataForm: FormGroup;
  existingPlayers: Player[] = [];

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
    });

    dialogRef.componentInstance.outputPlayerList.subscribe(() => {
      const addedPlayerList = dialogRef.componentInstance.addedPlayerList;
      addedPlayerList.forEach((player) => {
        this.playerList.push(this.preparePlayer(player));
        this.existingPlayers.push(player);
      });
    });
  }

  openNewPlayerModal(): void {}

  removeExistingPlayer(playerIndex: number) {
    this.playerList.removeAt(playerIndex);
    this.existingPlayers.splice(playerIndex, 1);
  }

  get playerList() {
    return this.playersDataForm.controls['playerList'] as FormArray;
  }
}
