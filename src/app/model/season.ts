export interface Season {
  id: number;
  leagueId: number;
  startDate: Date;
  endDate: Date | null;
  isFinished: boolean | null;
  initialRating: number;
}
