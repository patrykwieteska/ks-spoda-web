import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { EuroGroup } from 'src/app/model/euro';
import { EuroService } from 'src/app/services/euro-service.service';
import { EuroCalendarComponent } from '../euro-calendar/euro-calendar.component';
import { ThirdPlacesTableComponent } from '../third-places-table/third-places-table.component';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit, OnChanges {
  groups: EuroGroup[] = [];
  currentStage: string = '';
  changesCounter: number = 0;
  selectedTab: number = 0;
  @Input() playedTeams: number[] = [];

  @Input() seasonId: number = -1;
  @ViewChild('thirdPlaceTableRef')
  thirdPlaceTableRef!: ThirdPlacesTableComponent;
  @ViewChild('euroCalendarRef') euroCalendarRef!: EuroCalendarComponent;

  constructor(private euroService: EuroService) {}
  ngOnChanges(changes: SimpleChanges): void {
    var playedTeams = changes['playedTeams'];

    if (playedTeams) {
      this.playedTeams = playedTeams.currentValue;
    }
  }
  ngOnInit(): void {
    this.refreshData();
  }

  getlabel(code: string): string {
    return 'GRUPA ' + code;
  }

  refreshData() {
    if (this.euroCalendarRef) {
      this.euroCalendarRef.getEuroCalendar();
    }

    if (this.thirdPlaceTableRef) {
      this.thirdPlaceTableRef.refreshThirdPlaceTable();
    }

    this.euroService.getEuroGroups(this.seasonId).subscribe({
      next: (response) => {
        this.groups = response.groupList;
      },
    });
    this.euroService.getCurrentStage(this.seasonId).subscribe({
      next: (response) => {
        this.currentStage = response.stage;
        this.selectedTab = response.selectedTab;
      },
    });
  }
}
