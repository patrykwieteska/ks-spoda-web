export interface Player {
  id: number | null;
  name: string;
  alias: string;
  playerImg: string | null;
}

export interface PlayerList {
  playerList: Player[];
  apiPlayerList: Player[];
}
