import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../components/error/error.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private zone: NgZone, public dialog: MatDialog) {}

  public handleError(error: unknown) {
    let message: any;
    let status: any;
    let errorError: any;

    console.error(error);

    if (error instanceof HttpErrorResponse) {
      console.log('RESPONSE ERROR', error.error);
      message = error.error.message;
      status = error.error.status;
      errorError = error.message;
    } else if (error instanceof Error) {
      errorError = error;
    }

    this.zone.run(() => {
      this.dialog.open(ErrorComponent, {
        data: {
          message: message,
          status: status,
          error: errorError,
        },
        minWidth: 300,
        maxWidth: 500,
        position: { top: '30px' },
      });
    });
  }
}
