import { LeagueService } from 'src/app/services/league.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LeagueTable, LeagueTableRow } from 'src/app/model/league';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'league-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() leagueId!: number;
  @Input() leagueTable!: LeagueTable;
  @Output() chosenPlayer = new EventEmitter<Player | null>();

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
}
