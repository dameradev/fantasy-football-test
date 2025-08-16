import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
export default function Home() {
  return (
    <main className="min-h-screen bg-darkest-bg text-white p-6 flex flex-col">
      <div className="max-w-fit p-6 rounded-lg self-center flex gap-4 mb-6 bg-dark-gray">
        <div className="relative inline-block">
          <select className="appearance-none text-white px-4 py-1 rounded bg-dark-bg pr-8">
            <option>Select Operator</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
        </div>
        <div className="relative inline-block">
          <select className="appearance-none text-white px-4 py-1 rounded bg-dark-bg pr-8">
            <option>Select Game Type</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
        </div>
        <div className="relative inline-block">
          <select className="appearance-none text-white px-4 py-1 rounded bg-dark-bg pr-8">
            <option>Select Slate Name</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="overflow-hidden">
            <table className="w-full rounded-t-lg" >
              <thead className="bg-dark-bg">
                <tr>
                  {/* HAD TO ADD ROUNDED TOP LEFT AND TOP RIGHT, IT WASN'T WORKING WITH THE TABLE*/}
                  <th className="px-4 py-3 text-left rounded-tl-lg">Name</th>
                  <th className="px-4 py-3 text-left">Team</th>
                  <th className="px-4 py-3 text-left">Position</th>
                  <th className="px-4 py-3 text-left">Salary</th>
                  <th className="px-4 py-3 text-left rounded-tr-lg">Points</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-highlight ">
                  <td className="px-4 py-3">Tom Brady</td>
                  <td className="px-4 py-3">TB</td>
                  <td className="px-4 py-3">QB</td>
                  <td className="px-4 py-3">$11,200</td>
                  <td className="px-4 py-3">23</td>
                </tr>
                {[...Array(7)].map((_, i) => (
                  <tr key={i} className=" bg-dark-gray">
                    <td className="px-4 py-3">Patrick Mahomes</td>
                    <td className="px-4 py-3">KC</td>
                    <td className="px-4 py-3">QB</td>
                    <td className="px-4 py-3">$8,800</td>
                    <td className="px-4 py-3">23</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
        </div>

        <div className="w-80 bg-dark-gray rounded-lg p-6">
          <div className="w-32 h-32 mx-auto mb-4 bg-dark-bg rounded-full flex items-center justify-center">
            <div className="text-xs text-center text-medium-gray">
              Player<br />Image
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold">Tom Brady</h2>
          </div>

          <div className="text-center">
            <div className="text-6xl font-bold text-white mb-2">51</div>
            <div className="text-sm text-medium-gray">Points</div>
          </div>
        </div>
      </div>
    </main>
  );
}
