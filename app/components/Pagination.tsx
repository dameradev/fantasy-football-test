"use client";

import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';
import { PlayerFilter } from '../types/game-data';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  rowsPerPage: number;
  currentFilters: PlayerFilter;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  totalCount, 
  rowsPerPage,
  currentFilters,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateURL = (newPage: number, newRowsPerPage?: number) => {
    const params = new URLSearchParams(searchParams);
    
    if (newRowsPerPage) {
      params.set('rowsPerPage', newRowsPerPage.toString());
    }

    const queryString = params.toString();
    const newPath = `/players/${newPage}${queryString ? `?${queryString}` : ''}`;
    router.push(newPath);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateURL(newPage);
    }
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    const newTotalPages = Math.ceil(totalCount / newRowsPerPage);
    
    const newPage = currentPage <= newTotalPages ? currentPage : 1;
    
    updateURL(newPage, newRowsPerPage);
  };

  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalCount);

  return (
    <div className="py-4 px-4 rounded-b-lg flex items-center justify-between text-sm bg-dark-bg">
      <div className="flex items-center gap-2">
        <span>Page</span>
        <div className="relative inline-block">
          <select 
            className="appearance-none text-white px-2 py-1 rounded bg-darkest-bg pr-6"
            value={currentPage}
            onChange={(e) => handlePageChange(parseInt(e.target.value))}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <option key={pageNum} value={pageNum}>{pageNum}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
        </div>
        <span>Rows per page</span>
        <div className="relative inline-block">
          <select 
            className="appearance-none text-white px-2 py-1 rounded bg-darkest-bg pr-6"
            value={rowsPerPage}
            onChange={(e) => handleRowsPerPageChange(parseInt(e.target.value))}
          >
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={32}>32</option>
            <option value={64}>64</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span>{startItem} - {endItem} of {totalCount}</span>
        <div className="flex gap-2">
          <button 
            className={`p-1 rounded ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-darkest-bg'}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            className={`p-1 rounded ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-darkest-bg'}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
