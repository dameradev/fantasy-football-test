import { notFound } from 'next/navigation';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import Player from '../../components/Player';
import PlayerSelectionWrapper from '@/app/components/PlayerSelectionWrapper';
import FiltersController from '../../components/FiltersController';
import { fetchPlayers } from '../../services/api';
interface PlayersPageProps {
  params: Promise<{ page: string }>;
  searchParams: Promise<{
    rowsPerPage?: string;
    operator?: string;
    gameType?: string;
    slateId?: string;
    selectedPlayerId?: string;
  }>;
}

export default async function PlayersPage({ params, searchParams }: PlayersPageProps) {
  const { page: pageParam } = await params;
  const sp = await searchParams;

  const page = parseInt(pageParam);
  const rowsPerPage = parseInt(sp.rowsPerPage || '8');
  if (isNaN(page) || page < 1) notFound();

  const filters = {
    operator: sp.operator,
    gameType: sp.gameType,
    slateId: sp.slateId ? Number(sp.slateId) : undefined,
  };

  const response = await fetchPlayers(page, rowsPerPage, filters);
  if (!response.success) throw new Error(response.message || 'Failed to fetch players');

  const { data: players, pagination, meta } = response;
  const { totalCount, totalPages } = pagination;
  if (page > totalPages && totalPages > 0) notFound();

  const selectedPlayerId = sp.selectedPlayerId ? parseInt(sp.selectedPlayerId) : undefined;
  const selectedPlayer = selectedPlayerId ? players.find(p => p.slatePlayerId === selectedPlayerId) : undefined;

  const operatorOptions = (meta?.operatorOptions as string[]) ?? [];
  const gameTypeOptions = (meta?.gameTypeOptions as string[]) ?? [];
  const slateOptions = (meta?.slateOptions as { id: number; name: string | number }[]) ?? [];

  return (
    <main className="min-h-screen bg-darkest-bg text-white p-6 flex flex-col">
      <FiltersController
        operatorOptions={operatorOptions}
        gameTypeOptions={gameTypeOptions}
        slateOptions={slateOptions}
      />

      <div className="flex gap-6">
        <div className="flex-1">
          <PlayerSelectionWrapper selectedPlayerId={selectedPlayerId} currentPage={page}>
            <DataTable players={players} />
          </PlayerSelectionWrapper>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalCount={totalCount}
            rowsPerPage={rowsPerPage}
          />
        </div>

        <Player player={selectedPlayer} />
      </div>
    </main>
  );
}
