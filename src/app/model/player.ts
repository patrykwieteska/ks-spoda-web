export interface Player {
  id: number | null;
  name: string;
  alias: string;
}

export interface PlayerList {
  playerList: Player[];
  apiPlayerList: Player[];
}
