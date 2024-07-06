import { TableService } from './../../../services/table.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/model/player';
import { Table, TableRow } from 'src/app/model/table';

@Component({
  selector: 'app-season-table',
  templateUrl: './season-table.component.html',
  styleUrls: ['./season-table.component.css'],
})
export class SeasonTableComponent implements OnInit {
  showProgressBar = false;
  seasonId: number = -1;
  route: ActivatedRoute = inject(ActivatedRoute);
  seasonTable: Table = {
    header: '',
    tableRows: [],
    pointCountingMethod: '',
  };

  constructor(private tableService: TableService) {
    this.showProgressBar = true;
    this.seasonId = this.route.snapshot.params['seasonId'];
  }

  ngOnInit(): void {
    this.initSeasonTable();
  }

  initSeasonTable(): void {
    this.tableService.initSeasonTable(this.seasonId).subscribe({
      next: (response) => {
        this.seasonTable = response;
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
    var tableSize = this.seasonTable ? this.seasonTable.tableRows.length : 0;

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

    return positionDiff < 0 ? 'up' : positionDiff > 0 ? 'down' : 'none';
  }

  getIcon(leagueRow: TableRow): string {
    var positionDiff: number =
      leagueRow.currentPosition - leagueRow.previousPosition;

    return positionDiff < 0
      ? 'arrow_drop_up'
      : positionDiff > 0
      ? 'arrow_drop_down'
      : 'remove';
  }

  getPointCountingTooltip(): string {
    var pointCountingMethod = '';
    switch (this.seasonTable.pointCountingMethod) {
      case 'RATING':
        pointCountingMethod = 'Rating sezonowski';
        break;
      case 'POINTS_TOTAL':
        pointCountingMethod = 'Punkty';
        break;
      case 'POINTS_PER_MATCH':
        pointCountingMethod = 'Punkty / Mecz';
        break;
    }

    return pointCountingMethod;
  }

  getPointCountingMethod(): string {
    var pointCountingMethod = '';
    switch (this.seasonTable.pointCountingMethod) {
      case 'RATING':
        pointCountingMethod = 'RATING';
        break;
      case 'POINTS_TOTAL':
        pointCountingMethod = 'PKT';
        break;
      case 'POINTS_PER_MATCH':
        pointCountingMethod = 'P / M';
        break;
    }

    return pointCountingMethod;
  }

  getCorrectPointsType(seasonRow: TableRow) {
    var result = 0;
    switch (this.seasonTable.pointCountingMethod) {
      case 'RATING':
        result = seasonRow.rating;
        break;
      case 'POINTS_TOTAL':
        result = seasonRow.pointsTotal;
        break;
      case 'POINTS_PER_MATCH':
        result = seasonRow.pointsPerMatch;
        break;
    }
    return result;
  }

  tooltipMessage(seasonRow: TableRow): string {
    var positionDiff = seasonRow.previousPosition - seasonRow.currentPosition;

    return positionDiff == 0
      ? ''
      : positionDiff > 0
      ? '+' + positionDiff
      : '' + positionDiff;
  }
}
