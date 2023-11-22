import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Match } from 'src/app/model/match';
import { MatchService } from 'src/app/services/match.service';
import { NewMatchComponent } from '../new-match/new-match.component';
import { Player } from 'src/app/model/player';
import { MatchDayService } from 'src/app/services/match-day.service';
import { SimpleMatchDay } from 'src/app/model/match-day';
import { ErrorComponent } from 'src/app/components/error/error.component';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css'],
})
export class MatchListComponent implements OnInit, OnChanges {
  selected = -1;
  shorProgressBar = false;
  @Input() matchDayId: number = -1;

  @Input() seasonId: number = -1;
  @Input() newMatchOpenDialogCounter: number = 0;
  @Output() outMatchDay = new EventEmitter<SimpleMatchDay>();
  @Input() leaguePlayers!: Player[];
  @Output() matchChange = new EventEmitter<void>();

  matches: Match[] = [];
  matchDay: SimpleMatchDay | null = null;

  matchDayList: any = [];

  constructor(
    private matchService: MatchService,
    private matchDayService: MatchDayService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getMatchDayList(this.seasonId);
  }

  ngOnChanges(changes: SimpleChanges) {
    var newMatchOpenDialogCounter = changes['newMatchOpenDialogCounter'];
    console.log('newMatchOpenDialogCounter', newMatchOpenDialogCounter);
    if (
      newMatchOpenDialogCounter != undefined &&
      newMatchOpenDialogCounter.currentValue >
        newMatchOpenDialogCounter.previousValue
    ) {
      this.openNewMatchDialog();
    }
  }

  openNewMatchDialog() {
    if (!this.matchDay || this.matchDay?.isFinished) {
      this.dialog.open(ErrorComponent, {
        data: {
          message: 'Aby dodać mecz musisz najpierw dodać kolejkę',
          title: 'Brak aktywnej kolejki',
          buttonText: 'Ok',
          icon: 'info',
          iconColor: '#4169e1',
        },
        minWidth: 300,
        maxWidth: 500,
        position: { top: '30px' },
      });
      return;
    }
    const dialogRef = this.dialog.open(NewMatchComponent, {
      data: {
        matchDayId: this.matchDayId,
        gameTeamFlag: true,
        seasonId: this.seasonId,
      },
      disableClose: true,
    });

    dialogRef.componentInstance.outPutNewMatch.subscribe((value) => {
      this.getMatchDayMatches(this.matchDay);
      this.matchChange.emit();
      dialogRef.close(() => {
        console.log('Dialog closed');
      });
    });
  }

  getMatchDayList(seasonId: number) {
    this.shorProgressBar = true;
    this.matchDayService.getMatchDayList(seasonId).subscribe({
      next: (response) => {
        this.matchDayList = response.matchDays;
      },
      complete: () => {
        this.shorProgressBar = false;
        if (this.matchDayList.length > 0) {
          this.matchDayId = this.matchDayList[0].id;
          this.matchDay = this.matchDayList[0];
          this.getMatchDayMatches(this.matchDay);
        }
      },
    });
  }

  getMatchDayMatches(matchDay: SimpleMatchDay | null) {
    if (matchDay == null) {
      throw Error('Matchday is null');
    }

    this.shorProgressBar = true;
    this.matchService.getMatchDayMatches(matchDay.id).subscribe({
      next: (response) => {
        this.matches = response.matchList;
      },
      complete: () => {
        this.shorProgressBar = false;
        this.selected = matchDay.id;
        this.outMatchDay.emit(matchDay);
        console.log('matchDay output: ', matchDay);
      },
    });
  }

  takeMatchUpdatedEvent() {
    this.getMatchDayMatches(this.matchDay);
    this.matchChange.emit();
  }
}
