import { MatDialog } from '@angular/material/dialog';
import { SeasonService } from './../../../services/season.service';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Season, SeasonListResponse } from 'src/app/model/season';
import { NewSeasonComponent } from '../new-season/new-season.component';
import { CommonsService } from 'src/app/services/commons.service';

@Component({
  selector: 'app-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.css'],
})
export class SeasonListComponent implements OnInit, OnChanges {
  seasonList: Season[] = [];
  filteredSeasons: Season[] = [];
  message: string = '';
  seasonListResponse: SeasonListResponse = {
    message: null,
    seasons: [],
  };

  @Input() leagueId!: number;
  @Input() newSeasonOpenDialogCounter: number = 0;

  startDate = new FormControl();
  endDate = new FormControl();

  endDateIsBeforeStartDate = false;
  startDateIsAfterEndDate = false;

  constructor(
    private seasonService: SeasonService,
    private dialog: MatDialog,
    private commonsService: CommonsService
  ) {}

  ngOnInit(): void {
    this.getSeasonList();
  }
  getSeasonList() {
    this.seasonService.getSeasonsByLeagueId(this.leagueId).subscribe({
      next: (response) => {
        this.seasonListResponse = response;
      },
      complete: () => {
        this.seasonList = this.seasonListResponse.seasons;
        this.filteredSeasons = this.seasonList;
        if (this.seasonListResponse?.message) {
          this.message = this.seasonListResponse.message;
        }
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    var newSeasonDialogChange = changes['newSeasonOpenDialogCounter'];
    if (
      newSeasonDialogChange.currentValue > newSeasonDialogChange.previousValue
    ) {
      this.openNewSeasonDialog();
    }
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  filterSeasons(): void {
    console.log('start date ', this.startDate.value);
    console.log('end date ', this.endDate.value);

    this.endDateIsBeforeStartDate = false;
    this.startDateIsAfterEndDate = false;
    this.filteredSeasons = this.seasonList;

    var startDate: Date = this.commonsService.formatDate(this.startDate.value);
    var endDate: Date = this.commonsService.formatDate(this.endDate.value);
    var defaultSystemDate = this.commonsService.formatDate('1970-01-01');
    var defaultEndDate = this.commonsService.formatDate('3000-12-31');

    if (endDate == null || endDate == defaultSystemDate) {
      endDate = this.commonsService.formatDate('3000-12-31');
    }

    if (startDate == null) {
      startDate = defaultSystemDate;
    }

    if (startDate > endDate) {
      this.startDateIsAfterEndDate = true;
      return;
    }

    if (endDate < startDate) {
      this.endDateIsBeforeStartDate = true;
      return;
    }

    this.filteredSeasons = this.seasonList.filter((item) => {
      const endDateCondition =
        item.endDate != null
          ? item.endDate < endDate
          : endDate == null || endDate == defaultEndDate
          ? true
          : false;
      return item.startDate >= startDate && endDateCondition;
    });
  }

  openNewSeasonDialog() {
    const dialogRef = this.dialog.open(NewSeasonComponent, {
      data: {
        leagueId: this.leagueId,
      },
      // position: { top: '30px' },
      disableClose: true,
    });

    dialogRef.componentInstance.outputNewSeason.subscribe((value) => {
      value.seasonCount = this.seasonList.length + 1;
      this.seasonList.unshift(value);
      dialogRef.close(() => {
        console.log('Dialog closed');
      });
    });
  }

  clearDates() {
    this.startDate.setValue(null);
    this.endDate.setValue(null);
    this.filterSeasons();
  }
}
