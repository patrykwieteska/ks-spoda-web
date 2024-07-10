import { PlayerService } from './../../../services/player.service';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/model/player';
import { busyNameValidator } from 'src/app/services/validator.service';

@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.css'],
})
export class SearchPlayerComponent implements OnInit {
  @Input() busyAliases: string[] = [];
  @Input() playerList: Player[] = [];
  filteredPlayerList: Player[] = [];
  allPlayers: Player[] = [];
  @Output() outputPlayerForm = new EventEmitter<FormGroup>();

  constructor(
    private playerService: PlayerService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      playerAliases: string[];
    }
  ) {}
  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe({
      next: (value) => {
        if (value.players != null) {
          this.allPlayers = value.players;
        }
      },
      complete: () => {
        this.busyAliases = this.data.playerAliases;
        this.playerList = this.allPlayers.filter(
          (x) => !this.busyAliases.includes(x.alias)
        );
      },
    });

    console.log;
  }

  filterResults() {
    let text = (document.getElementById('player-filter') as HTMLInputElement)
      .value;
    if (!text) {
      this.filteredPlayerList = [];
    }

    if (text.length > 0) {
      this.filteredPlayerList = this.playerList.filter(
        (player) =>
          player?.alias.toLowerCase().includes(text.toLowerCase()) ||
          player?.name.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.filteredPlayerList = [];
    }
  }

  addPlayer(filteredPlayer: Player) {
    this.outputPlayerForm.emit(
      new FormGroup({
        name: new FormControl('EMPTY'),
        alias: new FormControl('EMPTY'),
        playerImg: new FormControl(''),
        playerId: new FormControl(filteredPlayer.id),
      })
    );
  }
}
