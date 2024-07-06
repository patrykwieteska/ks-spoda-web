export interface EuroMatch {
  matchNumber: number; // numer meczu z oficjalnego kalendarza UEFA
  tournamentStage: CurrentStage;
  tournamentGroup: string;
  played: boolean;
  homeTeam: EuroTeam;
  awayTeam: EuroTeam;
  homeGoals: number;
  awayGoals: number;
  penaltyKicks: PenaltyKicks | null;
  homePlayers: EuroPlayer[];
  awayPlayers: EuroPlayer[];
  dateTime: Date;
  playedCity: string;
  created: Date;
  updated: Date;
  finished: boolean;
  matchInProgress: boolean;
  message: String | null;
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
  penalties: PenaltyKicks | null;
}

export interface EuroPlayer {
  alias: string;
  imageUrl: string;
  externalPlayerId: number;
}

export interface EuroGroupResponse {
  groupList: EuroGroup[];
}

export interface EuroGroup {
  groupCode: string;
  teams: EuroGroupTeam[];
}

export interface EuroGroupTeam {
  id: string;
  team: EuroTeam;
  groupCode: string;
  points: number;
  wins: number;
  draws: number;
  loses: number;
  goalsScored: number;
  goalsConceded: number;
  groupPosition: number;
  matchInProgress: boolean;
}

export interface EuroCalendarResponse {
  euroMatches: EuroMatch[];
}

export interface EuroThirdPlacesResponse {
  teams: EuroGroupTeam[];
}

export interface CurrentStage {
  stage: string;
  selectedTab: number;
  description: string;
}

export interface PenaltyKicks {
  homeGoals: number;
  awayGoals: number;
}
