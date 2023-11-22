import { Component, Input, OnInit } from '@angular/core';
import { SimpleMatchDay } from 'src/app/model/match-day';
import { Table } from 'src/app/model/table';
import { MatchDayService } from 'src/app/services/match-day.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-matchday-table',
  templateUrl: './matchday-table.component.html',
  styleUrls: ['./matchday-table.component.css'],
})
export class MatchdayTableComponent implements OnInit {
  @Input() matchDay!: SimpleMatchDay;

  matchDayTable: Table = {
    header: '',
    tableRows: [],
    pointCountingMethod: '',
  };

  constructor(private tableService: TableService) {}
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
}
