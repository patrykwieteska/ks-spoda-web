import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewMatchDay } from 'src/app/model/match-day';
import { CommonsService } from 'src/app/services/commons.service';
import { MatchDayService } from 'src/app/services/match-day.service';

@Component({
  selector: 'app-new-matchday',
  templateUrl: './new-matchday.component.html',
  styleUrls: ['./new-matchday.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pl-PL' }],
})
export class NewMatchdayComponent {
  @Output() outputNewMatchDay = new EventEmitter<number>();

  matchDayForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { seasonId: number },
    private formBuilder: FormBuilder,
    private commonsService: CommonsService,
    private matchDayService: MatchDayService,
    private datePipe: DatePipe
  ) {
    this.matchDayForm = this.formBuilder.group({
      matchDayDate: [
        this.commonsService.formatDate(new Date()),
        Validators.required,
      ],
      location: '',
    });

    console.log(this.matchDayForm.value);
  }

  addMatchDay() {
    var newMatchDayId: number;

    if (this.data.seasonId == null) {
      throw new Error('Property seasonId is null');
    }

    if (this.matchDayForm.valid) {
      let date = this.datePipe.transform(
        this.matchDayForm.get('matchDayDate')?.value,
        'yyyy-MM-dd'
      );

      console.log('DATE OF FORM: 2', date);

      var matchDay: NewMatchDay = {
        matchDayDate: date,
        seasonId: this.data.seasonId,
        location: this.matchDayForm.get('location')?.value,
      };

      this.matchDayService.createMatchDay(matchDay).subscribe({
        next: (value) => {
          newMatchDayId = value.matchDayId;
        },
        complete: () => {
          this.outputNewMatchDay.emit(newMatchDayId);
        },
      });
    } else {
      this.matchDayForm.markAllAsTouched();
    }
  }
}
