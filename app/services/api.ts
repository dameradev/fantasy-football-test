import { GameData, SlatePlayer, PlayerFilter, GameSlate } from '../types/game-data';

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
  meta?: Record<string, unknown>;
}

type SlateOption = { id: number; name: string | number };

export async function fetchGameData(): Promise<ApiResponse<GameData>> {
  await delay(300);
  const gameData = (await import('../data/game-data.json')).default as GameData;

  return {
    data: gameData,
    success: true,
    timestamp: new Date().toISOString(),
  };
}


const normalizeGameType = (raw?: string): string => {
  if (!raw) return 'Unknown';
  const s = String(raw).trim();
  const upper = s.toUpperCase();

  if (upper === 'SINGLE_GAME') return 'Single Game';
  if (upper === 'MULTI_GAME') return 'Classic';

  if (/^[A-Z0-9_]+$/.test(s)) {
    return s
      .toLowerCase()
      .split('_')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  return s;
};

const extractSlateLabel = (slate: GameSlate): string => {
  const candidates = [
    slate.operatorSlateName,
    slate.operatorName,
    slate.name,
    slate.displayName,
  ].filter(Boolean);

  if (candidates.length) return String(candidates[0]);

  const g = Array.isArray(slate.dfsSlateGames) ? slate.dfsSlateGames[0] : undefined;
  const away = g?.teamA ?? g?.awayTeam ?? g?.away;
  const home = g?.teamB ?? g?.homeTeam ?? g?.home;
  if (away && home) return `${away} @ ${home}`;

  return `Slate ${slate.slateId}`;
};

function buildGlobalOperatorAndGameTypes(gameData: GameData) {
  const operators = new Set<string>();
  const seenGameTypes = new Set<string>();
  const gameTypeOptions: string[] = [];

  for (const slate of gameData) {
    const op = slate.operator ?? slate.operatorPlatform;
    if (op) operators.add(String(op));

    const gtRaw = slate.operatorGameType ?? slate.gameType ?? slate.contestType;
    const gt = normalizeGameType(gtRaw);
    const key = String(gt).toLowerCase();
    if (!seenGameTypes.has(key)) {
      seenGameTypes.add(key);
      gameTypeOptions.push(gt);
    }
  }

  const operatorOptions =
    operators.size > 0 ? Array.from(operators).sort() : ['DraftKings'];

  gameTypeOptions.sort((a, b) => a.localeCompare(b));

  return { operatorOptions, gameTypeOptions };
}


function buildSlateOptionsFromFilters(
  gameData: GameData,
  filters: PlayerFilter
): SlateOption[] {
  const targetOperator = filters.operator ?? undefined;
  const targetGameType = filters.gameType
    ? normalizeGameType(filters.gameType)
    : undefined;

  const normalizeStr = (v: unknown) => String(v ?? "").trim().toLowerCase();
  const getNormalizedSlateGameType = (slate: GameSlate) =>
    normalizeGameType(
      slate.operatorGameType ?? slate.gameType ?? slate.contestType
    );

  const optionsById = new Map<number, SlateOption>();
  for (const slate of gameData) {
    const slateOperator = slate.operator ?? null;
    const slateGameType = getNormalizedSlateGameType(slate);

    if (targetOperator && slateOperator !== targetOperator) continue;
    if (targetGameType && slateGameType !== targetGameType) continue;

    const id = slate.slateId;
    const label = extractSlateLabel(slate);

    if (targetGameType && normalizeStr(label) === normalizeStr(targetGameType)) {
      continue;
    }

    optionsById.set(id, { id, name: label });
  }

  const idsByLabel = new Map<string, number[]>();
  for (const { id, name } of optionsById.values()) {
    const labelKey = String(name);
    const list = idsByLabel.get(labelKey);
    if (list) list.push(id);
    else idsByLabel.set(labelKey, [id]);
  }

  const options: SlateOption[] = [];
  for (const { id, name } of optionsById.values()) {
    const label = String(name);
    const dupIds = idsByLabel.get(label) ?? [];
    const decoratedName = dupIds.length > 1 ? `${label} (#${id})` : label;
    options.push({ id, name: decoratedName });
  }

  options.sort((a, b) => {
    const an = normalizeStr(a.name);
    const bn = normalizeStr(b.name);
    return an === bn ? a.id - b.id : an.localeCompare(bn);
  });

  return options;
}


function applyFilters(
  gameData: GameData,
  filters: PlayerFilter = {}
): SlatePlayer[] {
  const { operator, gameType, slateId } = filters;
  const wantedGT = gameType ? normalizeGameType(gameType) : undefined;

  const slates = gameData.filter((slate) => {
    const op = slate.operator ?? null;
    const gt = normalizeGameType(slate.operatorGameType ?? slate.gameType ?? slate.contestType);
    if (operator && op !== operator) return false;
    if (wantedGT && gt !== wantedGT) return false;
    if (typeof slateId === 'number' && slate.slateId !== slateId) return false;
    return true;
  });

  const players: SlatePlayer[] = slates.flatMap((s: GameSlate) => s.dfsSlatePlayers);

  return players;
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
  return { players, totalCount, totalPages };
}


export async function fetchPlayers(
  page: number,
  rowsPerPage: number,
  filters: PlayerFilter = {}
): Promise<PaginatedResponse<SlatePlayer>> {
  await delay(200);

  const gameData = (await import('../data/game-data.json')).default as GameData;

  const { operatorOptions, gameTypeOptions } = buildGlobalOperatorAndGameTypes(gameData);
  const slateOptions = buildSlateOptionsFromFilters(gameData, filters);

  const filteredPlayers = applyFilters(gameData, filters);
  const { players, totalCount, totalPages } = applyPagination(filteredPlayers, page, rowsPerPage);

  return {
    data: players,
    pagination: { page, rowsPerPage, totalCount, totalPages },
    success: true,
    timestamp: new Date().toISOString(),
    meta: {
      operatorOptions,
      gameTypeOptions,
      slateOptions,
    },
  };
}