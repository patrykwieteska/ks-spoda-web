import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function busyNameValidator(namesList: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    return namesList.includes(value.toUpperCase()) ? { busyName: true } : null;
  };
}
