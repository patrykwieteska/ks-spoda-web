export interface Season {
  id: number | null;
  leagueId: number;
  seasonCount: number | null;
  startDate: Date;
  endDate: Date | null;
  isFinished: boolean | null;
  initialRating: number | null;
  pointCountingMethod: string;
  ratingType: string | null;
}

export interface SeasonListResponse {
  message: string | null;
  seasons: Season[];
}
