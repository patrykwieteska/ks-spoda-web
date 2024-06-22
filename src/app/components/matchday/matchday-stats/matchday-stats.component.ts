import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { SimpleMatchDay } from 'src/app/model/match-day';
import { NewMatchdayComponent } from '../new-matchday/new-matchday.component';
import { MatDialog } from '@angular/material/dialog';
import { MatchDayService } from 'src/app/services/match-day.service';
import { MatchdayTableComponent } from '../matchday-table/matchday-table.component';
import { MatchdayPlayersComponent } from '../matchday-players/matchday-players.component';

@Component({
  selector: 'app-matchday-stats',
  templateUrl: './matchday-stats.component.html',
  styleUrls: ['./matchday-stats.component.css'],
})
export class MatchdayStatsComponent implements OnChanges {
  @Input() newMatchDayOpenDialogCounter!: number;
  @Input() inputMatchDay!: SimpleMatchDay;
  @Input() seasonId!: number;
  @Output() createdMatchDayId = new EventEmitter<number>();
  @Output() completeMatchDayId = new EventEmitter<number>();
  checked = false;

  @ViewChild('matchDayTableRef') matchDayTableRef!: MatchdayTableComponent;
  @ViewChild('matchDayPlayersRef')
  matchDayPlayersRef!: MatchdayPlayersComponent;

  constructor(
    public dialog: MatDialog,
    private matchDayService: MatchDayService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    var newMatchDayOpenDialogCounter = changes['newMatchDayOpenDialogCounter'];
    if (
      newMatchDayOpenDialogCounter != undefined &&
      newMatchDayOpenDialogCounter.currentValue >
        newMatchDayOpenDialogCounter.previousValue
    ) {
      this.openNewMatchDayDialog();
    }
    if (changes['ininputMatchDay']) {
      this.inputMatchDay = changes['ininputMatchDay'].currentValue;
    }
  }

  openNewMatchDayDialog() {
    console.log('seasonId ble ble: ==> ' + this.seasonId);
    const dialogRef = this.dialog.open(NewMatchdayComponent, {
      data: {
        seasonId: this.seasonId,
      },
      // position: { top: '30px' },
      disableClose: true,
    });

    dialogRef.componentInstance.outputNewMatchDay.subscribe((value) => {
      this.createdMatchDayId.emit(value);
      dialogRef.close(() => {
        console.log('Dialog closed');
      });
    });
  }

  completeMatchDay() {
    var completedMatchDayId: number;
    this.matchDayService.complete(this.inputMatchDay.id).subscribe({
      next: (value) => {
        completedMatchDayId = value.matchDayId;
      },
      complete: () => {
        this.completeMatchDayId.emit(completedMatchDayId);
      },
    });
  }
}
