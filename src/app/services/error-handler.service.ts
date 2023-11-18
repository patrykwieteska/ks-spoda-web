import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../components/error/error.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    private zone: NgZone,
    public dialog: MatDialog,
    public router: Router
  ) {}

  public handleError(inputError: unknown) {
    let message: any;
    let status: any;
    let error: any;

    console.error(inputError);

    if (inputError instanceof HttpErrorResponse) {
      console.log('RESPONSE ERROR', inputError.error);
      message = inputError.error.message;
      status = inputError.error.status;
      error = inputError.message;

      switch (error.status) {
        case 401:
          this.router.navigateByUrl('/login');
          return;
        case 403:
          this.router.navigateByUrl('/unauthorized');
          return;
        case 404:
          this.router.navigateByUrl('/pageNotFound');
          return;
      }
    } else if (inputError instanceof Error) {
      error = inputError;
    }

    this.zone.run(() => {
      this.dialog.open(ErrorComponent, {
        data: {
          message: message,
          status: status,
          error: error,
        },
        minWidth: 300,
        maxWidth: 500,
        position: { top: '30px' },
      });
    });
  }
}
