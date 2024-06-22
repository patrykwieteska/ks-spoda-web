import { Component, Input } from '@angular/core';
import { EuroMatch } from 'src/app/model/euro';

@Component({
  selector: 'app-euro-match-item',
  templateUrl: './euro-match-item.component.html',
  styleUrls: ['./euro-match-item.component.css'],
})
export class EuroMatchItemComponent {
  @Input() match!: EuroMatch;
  homeGoals = 0;
  awayGoals = 0;
  homePenalties = 0;
  awayPenalties = 0;

  getHomeResultClass(): string {
    this.updateGoals();
    return this.getResultClass(
      this.homeGoals,
      this.awayGoals,
      this.homePenalties,
      this.awayPenalties
    );
  }

  updateGoals() {
    this.homeGoals = this.match.homeGoals;
    this.awayGoals = this.match.awayGoals;
    this.homePenalties = this.match.penaltyKicks
      ? this.match.penaltyKicks.homeGoals
      : 0;
    this.awayPenalties = this.match.penaltyKicks
      ? this.match.penaltyKicks.awayGoals
      : 0;
  }

  getAwayResultClass(): string {
    this.updateGoals();
    return this.getResultClass(
      this.awayGoals,
      this.homeGoals,
      this.awayPenalties,
      this.homePenalties
    );
  }

  getResultClass(
    teamGoals: number,
    opponentGoals: number,
    teamPenalties: number,
    opponentPenalties: number
  ): string {
    return teamGoals > opponentGoals || teamPenalties > opponentPenalties
      ? 'win-result'
      : '';
  }

  getMarginClass(tournamentStage: string) {
    return 'margin-' + tournamentStage;
  }
}
