import { MatchService } from 'src/app/services/match.service';
import { EditMatch, Match } from './../../../model/match';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/model/player';
import { DeleteMatchComponent } from '../delete-match/delete-match.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PenaltyKicks } from 'src/app/model/euro';
import { MatchCommentsComponent } from '../match-comments-dialog/match-comments-dialog.component';

@Component({
  selector: 'app-match-item',
  templateUrl: './match-item.component.html',
  styleUrls: ['./match-item.component.css'],
})
export class MatchItemComponent {
  @Input() match!: Match;
  @Output() outMatchUpdated = new EventEmitter<void>();
  isResultChanged: boolean = false;
  penalties: boolean = false;
  checked = false;

  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    public dialog: MatDialog
  ) {}

  updateMatchResult() {
    this.updateMatch(false);
  }
  updateMatch(isComplete: boolean) {
    var editMatch: EditMatch = {
      awayGoals: Number(this.inputAwayGoals),
      homeGoals: Number(this.inputHomeGoals),
      penalties: this.preparePenalties(),
      isComplete: isComplete,
      matchId: this.match.id,
    };

    this.matchService.updateMatch(editMatch).subscribe({
      complete: () => {
        this.outMatchUpdated.emit();
      },
    });
  }
  preparePenalties(): PenaltyKicks | null {
    let penaltyHomeGoals = Number(this.inputPenaltyHomeGoals);
    let penaltyAwayGoals = Number(this.inputPenaltyAwayGoals);

    if (
      this.match.playOffMatch === false ||
      (penaltyAwayGoals === 0 && penaltyAwayGoals === 0) ||
      Number(this.inputAwayGoals) !== Number(this.inputHomeGoals)
    ) {
      return null;
    }

    return {
      homeGoals: penaltyHomeGoals,
      awayGoals: penaltyAwayGoals,
    };
  }

  checkResult() {
    if (
      (this.match.awayGoals.toString() !== this.inputAwayGoals ||
        this.match.homeGoals.toString() !== this.inputHomeGoals) &&
      this.inputAwayGoals.length !== 0 &&
      this.inputHomeGoals.length !== 0
    ) {
      this.isResultChanged = true;
    } else {
      this.isResultChanged = false;
    }
  }

  get inputHomeGoals() {
    return this.getInputGoals('homeGoalsId', this.match.homeGoals);
  }

  get inputAwayGoals() {
    return this.getInputGoals('awayGoalsId', this.match.awayGoals);
  }

  get inputPenaltyAwayGoals() {
    return this.getInputGoals('awayPenaltyGoals', 0);
  }

  get inputPenaltyHomeGoals() {
    return this.getInputGoals('homePenaltyGoals', 0);
  }

  getInputGoals(elementId: string, defaultGoals: number): string {
    var goalsElement = document.getElementById(elementId) as HTMLInputElement;
    return goalsElement
      ? goalsElement.value.toString()
      : defaultGoals.toString();
  }

  endMatch() {
    this.updateMatch(true);
  }

  getPlayerImg(playerImg: string | null) {
    return this.playerService.getPlayerImg(playerImg);
  }

  removeMatch(matchId: number | null) {
    if (matchId == null) {
      console.log('matchId is null');
      return;
    }

    this.openDeleteMatchDialog(matchId);
  }

  openMatchComments(event: any, match: Match | null) {
    if (match == null) {
      console.log('matchId is null');
      return;
    }

    this.openMatchCommentsDialog(event, match);
  }

  openMatchCommentsDialog(
    event: { target: { getBoundingClientRect: () => any } },
    match: Match
  ): void {
    console.log(event.target.getBoundingClientRect());
    let targetAttr = event.target.getBoundingClientRect();
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    // dialogConfig.position = {
    //   top: targetAttr.y + targetAttr.height - 100 + 'px',
    //   left: targetAttr.x - targetAttr.width - 20 + 'px',
    // };
    dialogConfig.data = {
      match: match,
    };

    const dialogRef = this.dialog.open(MatchCommentsComponent, dialogConfig);

    // {
    //   data: {
    //     matchId: matchId,
    //   },
    //   position: { top: '100px', left: '200px' },
    // });
  }

  openDeleteMatchDialog(matchId: number): void {
    const dialogRef = this.dialog.open(DeleteMatchComponent, {
      data: {
        matchData: this.match,
      },

      position: { top: '100px' },
      disableClose: true,
    });

    dialogRef.componentInstance.deleteMatchOutput.subscribe(() => {
      dialogRef.close();
      this.outMatchUpdated.emit();
    });
  }

  checkPenaltiesResult(): boolean {
    return true; // logika wyznaczania mozliwości zakończenia meczu biorąca pod uwagę to czy karne są możliwe do rozegrania oraz czy jest remis i brak wyniku w kaarnych
  }
}
