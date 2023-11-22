import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  inject,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, startWith, map } from 'rxjs';
import { Player } from 'src/app/model/player';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-match-players',
  templateUrl: './match-players.component.html',
  styleUrls: ['./match-players.component.css'],
})
export class MatchPlayersComponent implements OnInit, OnChanges {
  @Input() leaguePlayers!: Player[];
  addedPlayers: Player[] = [];
  filteredPlayers: Player[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    console.log('ELO MORDO ', this.leaguePlayers);
    this.filteredPlayers = this.leaguePlayers;
    this.sortFilteredPlayers();
  }
  sortFilteredPlayers() {
    this.filteredPlayers.sort((a, b) => (a.alias > b.alias ? 1 : -1));
  }

  addPlayer(player: Player) {
    var index = this.filteredPlayers.indexOf(player);
    if (index >= 0) {
      this.filteredPlayers.splice(index, 1);
      this.addedPlayers.push(player);
    }
    this.sortFilteredPlayers();
  }

  removePlayer(player: Player) {
    this.removePlayerFromList(player, this.addedPlayers);
    this.filteredPlayers.push(player);
    this.sortFilteredPlayers();
  }

  removePlayerFromList(playerToRemove: Player, playerList: Player[]) {
    const index = playerList.indexOf(playerToRemove);
    if (index >= 0) {
      playerList.splice(index, 1);
    }
  }

  getPlayerImg(src: string | null) {
    return this.playerService.getPlayerImg(src);
  }
  resetForm(string: string) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);

    var leaguePlayers = changes['leaguePlayers'];
    this.leaguePlayers = leaguePlayers.currentValue;
    this.filteredPlayers = this.leaguePlayers;
  }
}
