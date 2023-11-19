import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonsService {
  constructor() {}

  public formatDate(date: string | Date): any {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  public findElementById(id: string) {
    return document.getElementById(id) as HTMLInputElement;
  }
}
