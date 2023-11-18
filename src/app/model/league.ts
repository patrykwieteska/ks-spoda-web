import { Player } from './player';

export interface League {
  leagueId: number;
  logoUrl: string;
  name: string;
  description: string | null;
  teamStructure: string;
  type: string;
  creationDate: Date;
  isPrivate: boolean | null;
}

export interface NewLeague {
  logoUrl: string | null;
  name: string;
  description: string | null;
  teamStructure: string;
  type: string;
  playerList: Player[];
  isPrivate: boolean | null;
}

export interface HeaderPanelData {
  title: string;
  imgSrc: string;
}

export interface LeagueTable {
  header: string;
  tableRows: LeagueTableRow[] | [];
}

export interface LeagueTableRow {
  player: Player;
  rating: number;
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
}
