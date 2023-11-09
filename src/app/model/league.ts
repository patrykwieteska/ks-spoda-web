import { Player } from './player';

export interface League {
  leagueId: number;
  logoUrl: string;
  name: string;
  description: string | null;
  teamStructure: string;
  type: string;
  creationDate: Date;
}

export interface NewLeague {
  logoUrl: string | null;
  name: string;
  description: string | null;
  teamStructure: string;
  type: string;
  playerList: Player[];
}
