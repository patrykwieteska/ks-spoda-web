import { SeasonService } from './../../../services/season.service';
import { CommonsService } from './../../../services/commons.service';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DialogHelpInfo } from 'src/app/model/dialog-help-data';
import { EnumType } from 'src/app/model/enumType';
import { Season } from 'src/app/model/season';
import { HelpDialogComponent } from '../../commons/help-dialog/help-dialog.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HelpInfoTemplates } from 'src/app/static/help-info-templates';

@Component({
  selector: 'app-new-season',
  templateUrl: './new-season.component.html',
  styleUrls: ['./new-season.component.css'],
})
export class NewSeasonComponent {
  @Input() leagueId!: number;
  @Output() outputNewSeason = new EventEmitter<Season>();

  pointCountingMethodHelpTemplate: DialogHelpInfo =
    HelpInfoTemplates.POINT_COUNTING_METHODS_HELP_TEMPLATE;
  ratingTypeHelpTemplate: DialogHelpInfo =
    HelpInfoTemplates.RATING_TYPE_HELP_TEMPLATE;
  euroInfo: DialogHelpInfo = HelpInfoTemplates.EURO_INFO;

  seasonForm: FormGroup;

  constructor(
    private commonsService: CommonsService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      leagueId: number;
    },
    private seasonService: SeasonService
  ) {
    this.seasonForm = this.formBuilder.group({
      startDate: [
        this.commonsService.formatDate(new Date()),
        Validators.required,
      ],
      pointCountingMethod: ['', Validators.required],
      ratingType: [''],
      isEuro: [false],
      image: [''],
      seasonName: [''],
    });
  }

  pointCountingMethodList: EnumType[] = [
    {
      key: 'RATING',
      valuePL: 'RANKING',
    },
    {
      key: 'POINTS_TOTAL',
      valuePL: 'PUNKTY',
    },
    {
      key: 'POINTS_PER_MATCH',
      valuePL: 'PUNKTY / MECZ',
    },
  ];

  ratingTypeList: EnumType[] = [
    {
      key: 'SINGLE',
      valuePL: 'INDYWIDUALNY',
    },
    {
      key: 'TEAM',
      valuePL: 'DRUŻYNOWY',
    },
  ];

  openHelpDialog(dialogData: DialogHelpInfo): void {
    const dialogRef = this.dialog.open(HelpDialogComponent, {
      data: { title: dialogData.title, template: dialogData.template },
      position: { top: '30px;' },
    });
  }

  addSeason() {
    if (this.seasonForm.valid) {
      var pointCountingMethod = this.seasonForm.get(
        'pointCountingMethod'
      )?.value;
      var ratingType =
        pointCountingMethod == 'RATING'
          ? this.seasonForm.get('ratingType')?.value
          : null;

      var season: Season = {
        id: null,
        leagueId: this.data.leagueId,
        seasonCount: null,
        startDate: this.seasonForm.get('startDate')?.value,
        endDate: null,
        isFinished: false,
        initialRating: null,
        pointCountingMethod: this.seasonForm.get('pointCountingMethod')?.value,
        ratingType: ratingType,
        hasNoActiveMatchDay: true,
        isEuro: this.seasonForm.get('isEuro')?.value,
        image: this.seasonForm.get('image')?.value,
        seasonName: this.seasonForm.get('seasonName')?.value,
      };

      this.seasonService.createSeason(season).subscribe({
        next: (value) => {
          season.id = value.seasonId;
        },
        complete: () => {
          this.outputNewSeason.emit(season);
        },
      });
    } else {
      this.seasonForm.markAllAsTouched();
    }
  }

  get seasonNameError(): string {
    const form: FormControl = this.seasonForm.get('seasonName') as FormControl;
    return form.hasError('minlength')
      ? 'Min. 4 znaki'
      : form.hasError('pattern')
      ? 'Nieprawidłowe znaki'
      : form.hasError('maxLength')
      ? 'Maks. 25 znaków'
      : '';
  }
}
