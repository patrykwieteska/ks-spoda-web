import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { busyNameValidator } from 'src/app/services/validator.service';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.css'],
})
export class NewPlayerComponent {
  newPlayerForm: FormGroup;

  flag = false;

  @Input() busyAliases: string[] = [];
  @Output() outputPlayerForm = new EventEmitter<FormGroup>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      playerAliases: string[];
    }
  ) {
    this.busyAliases = data.playerAliases;
    this.newPlayerForm = new FormGroup({
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
    });

    console.log(this.busyAliases);
  }

  addNewPlayer(): void {
    if (this.newPlayerForm.valid) {
      this.outputPlayerForm.emit(this.newPlayerForm);
    } else {
      this.newPlayerForm.markAllAsTouched();
    }
  }

  get nameError(): string {
    const form: FormControl = this.newPlayerForm.get('name') as FormControl;
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
    const form: FormControl = this.newPlayerForm.get('alias') as FormControl;
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

  // get busyAliasError() {
  //   return this.busyAliases.includes(this.newPlayerForm.get('alias')?.value);
  // }
}
