"use client";

import Filters from "./components/Filters";
import DataTable from "./components/DataTable";
import Pagination from "./components/Pagination";
import Player from "./components/Player";

export default function Home() {  

  return (
    <main className="min-h-screen bg-darkest-bg text-white p-6 flex flex-col">
      <Filters />

      <div className="flex gap-6">
        <div className="flex-1">
          <DataTable
            players={[]}
          />
          <Pagination />
        </div>

        <Player />

      </div>
    </main>
  );
}
