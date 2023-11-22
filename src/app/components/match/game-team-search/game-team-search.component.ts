import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { GameTeam } from 'src/app/model/match';

@Component({
  selector: 'app-game-team-search',
  templateUrl: './game-team-search.component.html',
  styleUrls: ['./game-team-search.component.css'],
})
export class GameTeamSearchComponent {
  gameTeamControl = new FormControl('', [Validators.required]);
  filteredGameTeams: Observable<GameTeam[]>;

  @Input() availableGameTeamList!: GameTeam[];
  @Output() gameTeamId = new EventEmitter<number>();

  constructor() {
    this.filteredGameTeams = this.gameTeamControl.valueChanges.pipe(
      startWith(''),
      map((gameTeam) =>
        gameTeam
          ? this._filterStates(gameTeam)
          : this.availableGameTeamList.slice()
      )
    );
  }

  private _filterStates(value: string): GameTeam[] {
    const filterValue = value.toLowerCase();
    return this.availableGameTeamList.filter((gameTeam) =>
      gameTeam.name.toLowerCase().includes(filterValue)
    );
  }

  selectGameTeam(gameTeam: GameTeam) {
    this.gameTeamId.emit(gameTeam.id);
  }

  validForms() {
    this.gameTeamControl.markAsTouched();
  }
}
