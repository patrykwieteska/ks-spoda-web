import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Match, MatchComment } from 'src/app/model/match';
import { Player } from 'src/app/model/player';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-comments-dialog',
  templateUrl: './match-comments-dialog.component.html',
  styleUrls: ['./match-comments-dialog.component.css'],
})
export class MatchCommentsComponent implements OnInit {
  players: Player[] = [];
  comments: MatchComment[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      match: Match;
    },
    private matchService: MatchService
  ) {
    // if (data.match.id) {
    //   matchService.uploadComments(data.match.id).subscribe({
    //     next: (response) => {
    //       this.comments = response.comments;
    //     },
    //   });
    // }
    this.comments = [
      {
        author: {
          name: 'Patryk',
          alias: 'Wietek',
          id: null,
          playerImg: null,
          desc: null,
          joinDate: null,
        },
        value: 'Co berdychy',
        date: new Date('2024-10-11T12:00:00'),
      },
      {
        author: {
          name: 'Mateusz',
          alias: 'Jałyj',
          id: null,
          playerImg: null,
          desc: null,
          joinDate: null,
        },
        value:
          'Rumuny jebane dybre, test test test test test test test test test test test test test test test',
        date: new Date('2024-10-11T11:00:00'),
      },
      {
        author: {
          name: 'Mateusz',
          alias: 'Jałyj',
          id: null,
          playerImg: null,
          desc: null,
          joinDate: null,
        },
        value:
          'Rumuny jebane dybre, test test test test test test test test test test test test test test test',
        date: new Date('2024-10-11T11:00:00'),
      },
    ];
  }
  ngOnInit(): void {
    this.players = this.data.match.awayTeam.matchPlayers.concat(
      this.data.match.homeTeam.matchPlayers
    );
  }
}
