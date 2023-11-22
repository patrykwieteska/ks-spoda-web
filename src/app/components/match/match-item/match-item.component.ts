import { MatchService } from 'src/app/services/match.service';
import { EditMatch, Match } from './../../../model/match';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/model/player';
import { DeleteMatchComponent } from '../delete-match/delete-match.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-match-item',
  templateUrl: './match-item.component.html',
  styleUrls: ['./match-item.component.css'],
})
export class MatchItemComponent {
  @Input() match!: Match;
  @Output() outMatchUpdated = new EventEmitter<void>();
  isResultChanged: boolean = false;
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
      isComplete: isComplete,
      matchId: this.match.id,
    };

    this.matchService.updateMatch(editMatch).subscribe({
      complete: () => {
        this.outMatchUpdated.emit();
      },
    });
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

  openDeleteMatchDialog(matchId: number): void {
    const dialogRef = this.dialog.open(DeleteMatchComponent, {
      data: {
        matchId: matchId,
      },
      position: { top: '100px' },
      disableClose: true,
    });

    dialogRef.componentInstance.deleteMatchOutput.subscribe(() => {
      dialogRef.close();
      this.outMatchUpdated.emit();
    });
  }
}
