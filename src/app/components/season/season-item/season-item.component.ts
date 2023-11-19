import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Component, Input } from '@angular/core';
import { Season } from 'src/app/model/season';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'app-season-item',
  templateUrl: './season-item.component.html',
  styleUrls: ['./season-item.component.css'],
})
export class SeasonItemComponent {
  @Input() season!: Season;

  showProgressBar = false;

  constructor(private seasonService: SeasonService) {}

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
}
