import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export default function Pagination() {
  return (
    <div className="py-4 px-4 rounded-b-lg flex items-center justify-between text-sm bg-dark-bg">
      <div className="flex items-center gap-2">
        <span>Page</span>
        <div className="relative inline-block">
          <select className="appearance-none text-white px-2 py-1 rounded bg-darkest-bg pr-6">
            <option>1</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
        </div>
        <span>Rows per page</span>
        <div className="relative inline-block">
          <select className="appearance-none text-white px-2 py-1 rounded bg-darkest-bg pr-6">
            <option>8</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span>1 - 8 of 200</span>
        <div className="flex gap-2">
          <button className="p-1 hover: rounded">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 hover: rounded">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
