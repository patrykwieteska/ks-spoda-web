import { League } from './league';
import { Player } from './player';
import { Season } from './season';
import { Table } from './table';

export interface InitLeagueResponse {
  league: League;
  seasons: Season[];
  playerList: Player[];
  leagueTable: Table;
}
