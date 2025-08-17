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

export interface GameSlate {
  slatePlayers: SlatePlayer[];
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

export interface PlayerFilter {
  position?: PlayerPosition;
  team?: string;
  minSalary?: number;
  maxSalary?: number;
  minFantasyPoints?: number;
  maxFantasyPoints?: number;
}

export interface PlayerSort {
  field: keyof SlatePlayer;
  direction: 'asc' | 'desc';
}

export const POSITIONS: PlayerPosition[] = ['QB', 'RB', 'WR', 'TE', 'WR/TE'];
export const ROSTER_SLOTS: RosterSlot[] = ['QB', 'RB', 'WR', 'TE', 'WR/TE', 'FLEX'];

export function isSlatePlayer(obj: SlatePlayer): obj is SlatePlayer {
  return obj && 
    typeof obj.slatePlayerId === 'number' &&
    typeof obj.operatorPlayerName === 'string' &&
    typeof obj.operatorPosition === 'string';
}

export function isGameSlate(obj: GameSlate): obj is GameSlate {
  return obj && 
    Array.isArray(obj.slatePlayers) &&
    typeof obj.operator === 'string' &&
    typeof obj.operatorSlateId === 'number';
}
