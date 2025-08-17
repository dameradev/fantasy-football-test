import { GameData, SlatePlayer } from '../types/game-data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    rowsPerPage: number;
    totalCount: number;
    totalPages: number;
  };
  success: boolean;
  message?: string;
  timestamp: string;
}

export async function fetchGameData(): Promise<ApiResponse<GameData>> {
  await delay(300);
  
  const gameData = (await import('../data/game-data.json')).default as GameData;
  
  return {
    data: gameData,
    success: true,
    timestamp: new Date().toISOString()
  };
}

export async function fetchPlayers(
  page: number,
  rowsPerPage: number,
): Promise<PaginatedResponse<SlatePlayer>> {
  await delay(200);
  
  const gameData = (await import('../data/game-data.json')).default as GameData;
  
  const allPlayers = gameData.flatMap(slate => slate.dfsSlatePlayers);
  const { players, totalCount, totalPages } = applyPagination(allPlayers, page, rowsPerPage);
  
  return {
    data: players,
    pagination: {
      page,
      rowsPerPage,
      totalCount,
      totalPages
    },
    success: true,
    timestamp: new Date().toISOString()
  };
}


export async function fetchPlayerById(playerId: number): Promise<ApiResponse<SlatePlayer>> {
  await delay(150);
  
  const gameData = (await import('../data/game-data.json')).default as GameData;
  const allPlayers = gameData.flatMap(slate => slate.dfsSlatePlayers);
  const player = allPlayers.find(p => p.playerId === playerId);
  
  if (!player) {
    throw new Error('Player not found');
  }
  
  return {
    data: player,
    success: true,
    timestamp: new Date().toISOString()
  };
}


function applyPagination(
  allPlayers: SlatePlayer[],
  page: number,
  rowsPerPage: number
): { players: SlatePlayer[]; totalCount: number; totalPages: number } {
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const players = allPlayers.slice(startIndex, endIndex);
  const totalCount = allPlayers.length;
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  return {
    players,
    totalCount,
    totalPages,
  };
}
