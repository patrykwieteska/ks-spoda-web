import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../components/error/error.component';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

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

    console.error('INPUT ERROR', inputError);

    if (inputError instanceof HttpErrorResponse) {
      message = inputError.error.errorMessage;
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

    console.log(
      `Application Error: { status: ${status}, message: ${message}, error: ${error}`
    );

    this.zone.run(() => {
      this.dialog.open(ErrorComponent, {
        data: {
          message: message,
          status: message ? null : status,
          error: message ? null : error,
          icon: message ? 'priority_high' : null,
          iconColor: message ? '#FF9800' : null,
        },
        minWidth: 300,
        maxWidth: 500,
        position: { top: '30px' },
      });
    });
  }
}
