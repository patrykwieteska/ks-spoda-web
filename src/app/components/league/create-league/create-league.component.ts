import { catchError } from 'rxjs/operators';
import { NewLeague } from './../../../model/league';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  FormArray,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { EnumType } from 'src/app/model/enumType';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../../commons/help-dialog/help-dialog.component';
import { HelpInfoTemplates } from 'src/app/static/help-info-templates';
import { DialogHelpInfo } from 'src/app/model/dialog-help-data';
import { ExistingPlayerComponent } from '../../player/existing-player/existing-player.component';
import { Player } from 'src/app/model/player';
import { LeagueService } from 'src/app/services/league.service';
import { PlayerService } from 'src/app/services/player.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorComponent } from '../../error/error.component';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CreateLeagueComponent implements OnInit {
  teamStructureHelpTemplate: DialogHelpInfo =
    HelpInfoTemplates.TEAM_STRUCTURE_HELP_TEMPLATE;
  leagueTypeHelpTemplate: DialogHelpInfo =
    HelpInfoTemplates.LEAGUE_TYPE_HELP_TEMPLATE;
  leagueService: LeagueService = inject(LeagueService);
  apiPlayerList: Player[] = [];

  generalDataForm: FormGroup;
  playersDataForm: FormGroup;
  minimalPlayerNumber: number = 0;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
    private router: Router
  ) {
    this.generalDataForm = this.formBuilder.group({
      leagueName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^(?:[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ+0-9_ ]+)?$/),
        ],
      ],
      leagueLogo: [''],
      leagueType: ['', Validators.required],
      teamStructure: ['', Validators.required],
      leagueDesc: [''],
    });

    this.playersDataForm = this.formBuilder.group({
      playerList: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe((value) => {
      if (value.players != null) {
        this.apiPlayerList = value.players;
      }
    });
  }

  leagueTypeList: EnumType[] = [
    {
      key: 'SEASON',
      valuePL: 'SEZON',
    },
    {
      key: 'CUP',
      valuePL: 'PUCHAR',
    },
  ];

  teamStructureList: EnumType[] = [
    {
      key: 'SINGLE',
      valuePL: '1 NA 1',
    },
    {
      key: 'DOUBLE',
      valuePL: '2 NA 2',
    },
    {
      key: 'MIXED',
      valuePL: 'MIESZANE',
    },
  ];

  submit(): void {
    this.updatePlayerFormValidators();

    let generalDataValid = this.generalDataForm.valid;
    let playerListValid = this.playersDataForm.valid;

    if (!generalDataValid) {
      console.log('League data list is invalid');
    }

    if (!playerListValid) {
      console.log('Player list is invalid');
    }

    if (!playerListValid || !generalDataValid) {
      this.playersDataForm.markAllAsTouched();
      this.generalDataForm.markAllAsTouched();
      this.dialog.open(ErrorComponent, {
        data: {
          message: 'Popraw dane na formularzu',
          title: 'Błąd',
          icon: 'warning',
          iconColor: 'orange',
        },
        position: { top: '10px' },
      });
      return;
    }

    const leagueData = this.generalDataForm.value;
    const league: NewLeague = {
      logoUrl: leagueData.leagueLogo ?? null,
      name: leagueData.leagueName ?? '',
      description: leagueData.leagueDesc ?? null,
      teamStructure: leagueData.teamStructure ?? '',
      type: leagueData.leagueType ?? '',
      playerList: this.playersDataForm.value.playerList,
    };

    this.leagueService.createLeague(league).subscribe({
      complete: () => {
        this.redirectToHome();
      },
    });
  }

  openHelpDialog(dialogData: DialogHelpInfo): void {
    const dialogRef = this.dialog.open(HelpDialogComponent, {
      data: { title: dialogData.title, template: dialogData.template },
    });
  }

  takePlayersForm(playersForm: FormGroup) {
    this.playersDataForm = playersForm;
    this.updatePlayerFormValidators();
  }
  updatePlayerFormValidators(): void {
    this.playersDataForm.controls['playerList'].setValidators([
      Validators.minLength(this.minimalPlayerNumber),
      Validators.required,
    ]);
    this.playersDataForm.controls['playerList'].updateValueAndValidity();
  }

  takeMinimalPlayersNumber(minPlayersNumber: number) {
    this.minimalPlayerNumber = minPlayersNumber;
  }

  playerListErrorMessage(): string {
    return this.playersDataForm.value.playerList.length === 0 ||
      this.minimalPlayerNumber === 0
      ? 'Uzupenij listę graczy'
      : 'Minimalna liczba graczy: ' + this.minimalPlayerNumber;
  }

  prepareMinPlayersValue(key: string) {
    switch (key) {
      case 'SINGLE': {
        this.minimalPlayerNumber = 2;
        break;
      }
      case 'MIXED': {
        this.minimalPlayerNumber = 3;
        break;
      }
      case 'DOUBLE': {
        this.minimalPlayerNumber = 4;
        break;
      }
      default: {
        this.minimalPlayerNumber = this.minimalPlayerNumber;
      }
    }

    this.updatePlayerFormValidators();
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  get leagueNameError(): string {
    const form: FormControl = this.generalDataForm.get(
      'leagueName'
    ) as FormControl;
    return form.hasError('required')
      ? 'Nazwa jest wymagana'
      : form.hasError('minlength')
      ? 'Zbyt krótka nazwa'
      : form.hasError('pattern')
      ? 'Nieprawidłowe znaki'
      : '';
  }
}
