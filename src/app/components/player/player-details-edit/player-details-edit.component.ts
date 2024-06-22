import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { response } from 'express';
import { Player } from 'src/app/model/player';
import {
  EditedPlayer,
  NewPlayer,
  PlayerService,
} from 'src/app/services/player.service';
import { busyNameValidator } from 'src/app/services/validator.service';

@Component({
  selector: 'app-player-details-edit',
  templateUrl: './player-details-edit.component.html',
  styleUrls: ['./player-details-edit.component.css'],
})
export class PlayerDetailsEditComponent {
  @Input() chosenPlayer!: Player | null;
  @Input() busyAliases: string[] = [];
  @Output() editModeDisabled = new EventEmitter<void>();
  editPlayerForm: FormGroup;

  constructor(
    private playerService: PlayerService,
    private formBuilder: FormBuilder
  ) {
    this.editPlayerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?:[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+)?$/), //alphabetic
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      alias: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?:[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ+0-9_]+)?$/), // aplhanumeric with underscore
        Validators.minLength(4),
        Validators.maxLength(20),
        busyNameValidator(this.busyAliases),
      ]),

      playerImg: new FormControl(''),
      description: new FormControl(''),
    });
  }

  getPlayerImg(playerImg: string | null) {
    return this.playerService.getPlayerImg(playerImg);
  }

  closeEditMode() {
    this.editModeDisabled.emit();
  }

  editPlayer() {
    if (!this.chosenPlayer || this.chosenPlayer.id === null) {
      console.log('Wrong player data: ', this.chosenPlayer);

      return;
    }

    let playerId: number = this.chosenPlayer ? this.chosenPlayer.id : 0;

    if (this.editPlayerForm.valid) {
      let player: EditedPlayer = {
        name: this.editPlayerForm.get('name')?.value,
        alias: this.editPlayerForm.get('alias')?.value,
        playerImg: this.editPlayerForm.get('playerImg')?.value,
        description: this.editPlayerForm.get('description')?.value,
      };

      this.playerService.editPlayer(player, playerId).subscribe({
        complete: () => {
          this.editModeDisabled.emit();
        },
      });
    } else {
      this.editPlayerForm.markAllAsTouched();
    }
  }

  get nameError(): string {
    const form: FormControl = this.editPlayerForm.get('name') as FormControl;
    return form.hasError('required')
      ? 'Imię jest wymagane'
      : form.hasError('minlength')
      ? 'Zbyt krótkie imię'
      : form.hasError('pattern')
      ? 'Nieprawidłowe znaki'
      : form.hasError('maxlength')
      ? 'Zbyt długie imię'
      : '';
  }

  get aliasError(): string {
    const form: FormControl = this.editPlayerForm.get('alias') as FormControl;
    return form.hasError('required')
      ? 'Nazwa jest wymagana'
      : form.hasError('minlength')
      ? 'Zbyt krótka nazwa'
      : form.hasError('pattern')
      ? 'Nieprawidłowe znaki'
      : form.hasError('maxlength')
      ? 'Zbyt długa nazwa'
      : form.hasError('busyName')
      ? 'Nazwa zawodnika zajęta'
      : '';
  }
}
