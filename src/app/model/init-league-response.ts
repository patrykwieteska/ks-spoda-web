import { League, LeagueTable } from './league';
import { Player } from './player';
import { Season } from './season';

export interface InitLeagueResponse {
  league: League;
  seasons: Season[];
  playerList: Player[];
  leagueTable: LeagueTable;
}
