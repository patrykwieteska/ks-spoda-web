export interface EuroMatch {
  matchNumber: number; // numer meczu z oficjalnego kalendarza UEFA
  tournamentStage: string;
  tournamentGroup: string;
  played: boolean;
  homeTeam: EuroTeam;
  awayTeam: EuroTeam;
  homeGoals: number;
  awayGoals: number;
  homePlayers: EuroPlayer[];
  awayPlayers: EuroPlayer[];
  dateTime: Date;
  playedCity: string;
  created: Date;
  updated: Date;
  finished: boolean;
}

export interface EuroTeam {
  teamId: number;
  ranking: number;
  name: string;
  engName: string;
  flag: string;
  groupCode: string;
}

export interface NewEuroMatch {
  matchDayId: number;
  homePlayers: number[];
  homeGoals: number;
  awayPlayers: number[];
  awayGoals: number;
  euroMatchId: number;
}

export interface EuroPlayer {
  alias: string;
  imageUrl: string;
  externalPlayerId: number;
}
