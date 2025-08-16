import FilterBar from "./components/FilterBar";
import DataTable from "./components/DataTable";
import Pagination from "./components/Pagination";
import PlayerCard from "./components/PlayerCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-darkest-bg text-white p-6 flex flex-col">
      <FilterBar />
      
      <div className="flex gap-6">
        <div className="flex-1">
          <DataTable />
          <Pagination />
        </div>

        <PlayerCard name="Tom Brady" points={51} />
      </div>
    </main>
  );
}
