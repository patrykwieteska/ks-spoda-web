import { CurrentStage, EuroMatch } from 'src/app/model/euro';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EuroService } from 'src/app/services/euro-service.service';

@Component({
  selector: 'app-euro-calendar',
  templateUrl: './euro-calendar.component.html',
  styleUrls: ['./euro-calendar.component.css'],
})
export class EuroCalendarComponent implements OnInit {
  roundOf16: EuroMatch[] = [];
  quarterfinal: EuroMatch[] = [];
  semifinal: EuroMatch[] = [];
  final: EuroMatch[] = [];
  allMatches: EuroMatch[] = [];
  isCalendar: boolean = false;

  @Input() externals!: ElementRef;
  @Input() seasonId!: number;
  @Input() playedTeams: number[] = [];
  constructor(private euroService: EuroService) {}
  ngOnInit(): void {
    this.getEuroCalendar();
  }

  getEuroCalendar() {
    this.euroService.getEuroCalendar('PLAYOFF', this.seasonId).subscribe({
      next: (response) => {
        this.allMatches = response.euroMatches;
        this.createCalendars(response.euroMatches);
        this.isCalendar = true;
      },
    });
  }

  public createCalendars(matches: EuroMatch[]) {
    this.roundOf16 = this.prepareMatchesOfRound('ROUND_OF_16', matches);
    this.quarterfinal = this.prepareMatchesOfRound('QUARTER_FINALS', matches);
    this.semifinal = this.prepareMatchesOfRound('SEMI_FINALS', matches);
    this.final = this.prepareMatchesOfRound('FINAL', matches);
  }
  prepareMatchesOfRound(stage: string, matches: EuroMatch[]): EuroMatch[] {
    var filteredMatches: EuroMatch[] = matches;
    filteredMatches = filteredMatches.filter((match) => {
      return match.tournamentStage.stage == stage;
    });
    return filteredMatches;
  }

  isRoundOf16(stage: string): boolean {
    return stage == 'ROUND_OF_16';
  }
}
