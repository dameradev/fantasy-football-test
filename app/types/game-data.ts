export interface SlatePlayer {
  slatePlayerId: number;
  slateId: number;
  slateGameId: number | null;
  playerId: number;
  playerGameProjectionStatId: number | null;
  fantasyDefenseProjectionStatId: number | null;
  operatorPlayerId: string;
  operatorSlatePlayerId: string;
  operatorPlayerName: string;
  operatorPosition: PlayerPosition;
  operatorSalary: number;
  team: string | null;
  teamId: number | null;
  removedByOperator: boolean;
  operatorRosterSlots: RosterSlot[];
  fantasyPoints?: number;
  fantasyPointsPerDollar?: number;
}

export interface DfsSlateGame {
  slateGameId: number;
  slateId: number;
  gameId: number;
  operatorGameId: number;
  removedByOperator: boolean;
  scoreId: number;
  game: Record<string, unknown>;
  awayTeam?: string;
  homeTeam?: string;
  teamA?: string;
  teamB?: string;
  away?: string;
  home?: string;
}

export interface GameSlate {
  _id: string;
  season: number;
  seasonType: number;
  slateId: number;
  week: number;
  _lastUpdatedDate: string;
  dfsSlateGames: DfsSlateGame[];
  dfsSlatePlayers: SlatePlayer[];
  isMultiDaySlate: boolean;
  numberOfGames: number;
  operator: string;
  operatorDay: string;
  operatorGameType: string;
  operatorName: string;
  operatorSlateId: number;
  operatorStartTime: string;
  removedByOperator: boolean;
  salaryCap: number;
  slateRosterSlots: RosterSlot[];
  id: string;
  operatorSlateName?: string;
  name?: string;
  displayName?: string;
  gameType?: string;
  contestType?: string;
  operatorPlatform?: string;
}

export type PlayerPosition = 'QB' | 'RB' | 'WR' | 'TE' | 'WR/TE';
export type RosterSlot = 'QB' | 'RB' | 'WR' | 'TE' | 'WR/TE' | 'FLEX';

export interface PlayerStats {
  fantasyPoints: number;
  fantasyPointsPerDollar: number;
}

export interface Team {
  id: number;
  abbreviation: string;
  name: string;
}

export interface GameProjection {
  id: number;
  playerId: number;
}

export interface FantasyDefenseProjection {
  id: number;
}

export type GameData = GameSlate[];

export const POSITIONS: PlayerPosition[] = ['QB', 'RB', 'WR', 'TE', 'WR/TE'];
export const ROSTER_SLOTS: RosterSlot[] = ['QB', 'RB', 'WR', 'TE', 'WR/TE', 'FLEX'];

export type PlayerFilter = {
  operator?: string;
  gameType?: string;
  slateId?: number;
};
export interface PlayerSort {
  field: keyof SlatePlayer;
  direction: 'asc' | 'desc';
}

export function isSlatePlayer(obj: SlatePlayer): obj is SlatePlayer {
  return obj && 
    typeof obj.slatePlayerId === 'number' &&
    typeof obj.operatorPlayerName === 'string' &&
    typeof obj.operatorPosition === 'string';
}

export function isGameSlate(obj: GameSlate): obj is GameSlate {
  return obj && 
    Array.isArray(obj.dfsSlatePlayers) &&
    typeof obj.operator === 'string' &&
    typeof obj.operatorSlateId === 'number';
}
