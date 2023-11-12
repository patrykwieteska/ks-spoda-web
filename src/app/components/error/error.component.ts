import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  title = 'Błąd ';
  message: string = 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie za chwilę';
  icon: string = 'error';
  buttonText = 'Zamknij';
  status: number | null = null;
  error: Error | null = null;
  iconStyle = 'color: ';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      message: string;
      icon: string;
      iconColor: string;
      buttonText: string;
      status: number;
      title: string;
      error: Error;
    },
    private dialogRef: MatDialogRef<ErrorComponent>
  ) {
    dialogRef.disableClose = true;
    if (data?.icon) this.icon = data.icon;
    if (data?.message) this.message = data.message;
    if (data?.buttonText) this.buttonText = data.buttonText;
    if (data?.title) this.title = data.title;
    if (data?.status) {
      this.status = data.status;
      this.title = this.title + '(status: ' + this.status + ')';
    }
    if (data?.error) this.error = data.error;
    if (data?.iconColor) this.iconStyle = this.iconStyle + data.iconColor;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
