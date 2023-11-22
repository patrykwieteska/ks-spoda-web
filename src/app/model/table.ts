import { Player } from './player';

export interface Table {
  header: string;
  pointCountingMethod: string;
  tableRows: TableRow[];
}

export interface TableRow {
  player: Player;
  rating: number;
  previousRating: number;
  pointsTotal: number;
  pointsPerMatch: number;
  matches: number;
  wins: number;
  draws: number;
  loses: number;
  goalsScored: number;
  goalsConceded: number;
  goalsDiff: number;
  form: string[];
  currentPosition: number;
  previousPosition: number;
  previousPositionReference: string;
  matchInProgress: boolean;
}
