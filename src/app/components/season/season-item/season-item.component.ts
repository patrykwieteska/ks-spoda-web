import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Component, Input } from '@angular/core';
import { Season } from 'src/app/model/season';
import { SeasonService } from 'src/app/services/season.service';
import { HelpInfoTemplates } from 'src/app/static/help-info-templates';
import { HelpDialogComponent } from '../../commons/help-dialog/help-dialog.component';
import { DialogHelpInfo } from 'src/app/model/dialog-help-data';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-season-item',
  templateUrl: './season-item.component.html',
  styleUrls: ['./season-item.component.css'],
})
export class SeasonItemComponent {
  @Input() season!: Season;

  showProgressBar = false;

  constructor(private seasonService: SeasonService, public dialog: MatDialog) {}

  completeSeason() {
    console.log(this.season);
    if (this.season.id != null) {
      this.showProgressBar = true;
      this.seasonService.completeSeason(this.season.id).subscribe({
        complete: () => {
          this.showProgressBar = false;
          this.season.isFinished = true;
        },
      });
    }
  }

  getPointsCountingmethod(): string {
    switch (this.season.pointCountingMethod) {
      case 'POINTS_TOTAL':
        return ' Punkty';
      case 'RATING':
        return ' Ranking';
      case 'POINTS_PER_MATCH':
        return ' śr. punkty / mecze';
    }

    throw new Error('Error in season.pointCountingMethod');
  }

  getRatingType(): string {
    switch (this.season.ratingType) {
      case 'TEAM':
        return ' (drużynowy)';
      case 'SINGLE':
        return ' (indywidualny)';
      default:
        return '';
    }
  }

  openRatingTypeHelp(): void {
    var dialogData: DialogHelpInfo =
      HelpInfoTemplates.RATING_TYPE_HELP_TEMPLATE;
    const dialogRef = this.dialog.open(HelpDialogComponent, {
      data: { title: dialogData.title, template: dialogData.template },
      position: { top: '30px;' },
      maxWidth: 400,
    });
  }
}
