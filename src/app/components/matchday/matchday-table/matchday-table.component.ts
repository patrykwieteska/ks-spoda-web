import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SimpleMatchDay } from 'src/app/model/match-day';
import { Table } from 'src/app/model/table';
import { MatchDayService } from 'src/app/services/match-day.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-matchday-table',
  templateUrl: './matchday-table.component.html',
  styleUrls: ['./matchday-table.component.css'],
})
export class MatchdayTableComponent implements OnInit, OnChanges {
  @Input() matchDay!: SimpleMatchDay;

  matchDayTable: Table = {
    header: '',
    tableRows: [],
    pointCountingMethod: '',
  };

  constructor(private tableService: TableService) {}

  ngOnChanges(changes: SimpleChanges): void {
    let changesMatchDay = changes['matchDay'];
    if (changesMatchDay) {
      this.matchDay = changesMatchDay.currentValue;
      this.initMatchDayTable();
    }
  }

  ngOnInit(): void {
    this.initMatchDayTable();
  }

  initMatchDayTable() {
    this.tableService.initMatchDayTable(this.matchDay.id).subscribe({
      next: (response) => {
        this.matchDayTable = response;
      },
      complete: () => {},
    });
  }

  getPositionClass(position: number): string {
    if (position == null) throw new Error('Player position is null');
    var tableSize = this.matchDayTable
      ? this.matchDayTable.tableRows.length
      : 0;

    var baseName = 'position';
    var result: string;
    if (position < 4) {
      result = baseName + '-' + position;
    } else if (tableSize <= position) {
      result = baseName + '-last';
    } else {
      result = baseName + '-default';
    }
    return baseName + ' ' + result;
  }
}
