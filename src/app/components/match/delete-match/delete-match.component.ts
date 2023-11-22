import { MatchService } from './../../../services/match.service';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-match',
  templateUrl: './delete-match.component.html',
  styleUrls: ['./delete-match.component.css'],
})
export class DeleteMatchComponent {
  @Output() deleteMatchOutput = new EventEmitter<void>();
  confirmText: string = 'Czy na pewno chcesz usunąć mecz?';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      matchId: number;
    },
    private matchService: MatchService
  ) {}

  removeMatch() {
    this.matchService.removeMatch(this.data.matchId).subscribe({
      complete: () => {
        this.deleteMatchOutput.emit();
      },
    });
  }
}
