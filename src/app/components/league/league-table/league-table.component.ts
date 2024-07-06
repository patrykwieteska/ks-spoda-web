import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/model/player';
import { Table, TableRow } from 'src/app/model/table';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() leagueId!: number;
  @Output() chosenPlayer = new EventEmitter<Player | null>();

  showProgressBar = false;

  leagueTable: Table = {
    header: '',
    tableRows: [],
    pointCountingMethod: '',
  };

  tableColumns: string[] = [
    'position',
    'playerAlias',
    'points',
    'matches',
    'wins',
    'draws',
    'loses',
    'goalsScored',
    'goalsConceded',
    'form',
  ];

  constructor(private tableService: TableService) {
    this.showProgressBar = true;
  }

  ngOnInit(): void {
    this.getLeagueTable();
  }
  getLeagueTable() {
    this.tableService.initLeagueTable(this.leagueId).subscribe({
      next: (response) => {
        this.leagueTable = response;
      },
      complete: () => {
        this.showProgressBar = false;
      },
    });
  }

  getPlayerImg(src: string | null): string {
    return src ? src : '../../../../assets/default_player_logo.png';
  }

  getPositionClass(position: number): string {
    if (position == null) throw new Error('Player position is null');
    var tableSize = this.leagueTable ? this.leagueTable.tableRows.length : 0;

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

  emitPlayer(player: Player | null) {
    this.chosenPlayer.emit(player);
  }

  getFormClass(matchResult: string) {
    var result = '';
    var baseClass = 'form';

    switch (matchResult) {
      case 'Z':
        result = baseClass + '-win';
        break;
      case 'R':
        result = baseClass + '-draw';
        break;
      case 'P':
        result = baseClass + '-lose';
        break;
    }

    return baseClass + ' ' + result;
  }
  getClass(leagueRow: TableRow): string {
    var positionDiff: number =
      leagueRow.currentPosition - leagueRow.previousPosition;

    return positionDiff > 0 ? 'up' : positionDiff < 0 ? 'down' : 'none';
  }

  getIcon(leagueRow: TableRow): string {
    var positionDiff: number =
      leagueRow.currentPosition - leagueRow.previousPosition;

    return positionDiff > 0
      ? 'arrow_drop_up'
      : positionDiff < 0
      ? 'arrow_drop_down'
      : 'remove';
  }
}
