import { Player } from './player';

export interface Match {
  id: number | null;
  matchTime: Date;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  homeGoals: number;
  awayGoals: number;
  isFinished: boolean | null;
}

export interface MatchTeam {
  matchPlayers: Player[];
  gameTeam: GameTeam;
}

export interface GameTeam {
  id: number;
  name: string;
  shortName: string;
  teamAlias: string;
  overallRating: number;
  badgeImg: string;
}

export interface NewMatch {
  matchDayId: number;
  homePlayers: number[];
  homeGoals: number[];
  homeGameTeamId: number | null;
  awayPlayers: number;
  awayGoals: number;
  awayGameTeamId: number;
}

export interface EditMatch {
  matchId: number | null;
  homeGoals: number;
  awayGoals: number;
  isComplete: boolean;
}
