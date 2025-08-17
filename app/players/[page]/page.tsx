import { notFound } from 'next/navigation';
import Filters from '../../components/Filters';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import Player from '../../components/Player';
import { fetchPlayers } from '../../services/api';

interface PlayersPageProps {
  params: Promise<{
    page: string;
  }>;
  searchParams: Promise<{
    rowsPerPage?: string;
    position?: string;
    team?: string;
    minSalary?: string;
    maxSalary?: string;
    minFantasyPoints?: string;
    maxFantasyPoints?: string;
  }>;
}

export default async function PlayersPage({ params, searchParams }: PlayersPageProps) {
  const { page: pageParam } = await params;
  const searchParamsResolved = await searchParams;

  const page = parseInt(pageParam);
  const rowsPerPage = parseInt(searchParamsResolved.rowsPerPage || '8');

  if (isNaN(page) || page < 1) {
    notFound();
  }

  const response = await fetchPlayers(page, rowsPerPage);

  if (!response.success) {
    throw new Error(response.message || 'Failed to fetch players');
  }

  const { data: players, pagination } = response;
  const { totalCount, totalPages } = pagination;

  if (page > totalPages && totalPages > 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-darkest-bg text-white p-6 flex flex-col">
      <Filters />

      <div className="flex gap-6">
        <div className="flex-1">
          <DataTable players={players} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalCount={totalCount}
            rowsPerPage={rowsPerPage}
            currentFilters={{}}
          />
        </div>

        <Player />
      </div>
    </main>
  );

}
