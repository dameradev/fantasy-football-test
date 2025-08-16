export default function DataTable() {
  return (
    <div className="overflow-hidden">
      <table className="w-full rounded-t-lg">
        <thead className="bg-dark-bg">
          <tr>
            <th className="px-4 py-3 text-left rounded-tl-lg">Name</th>
            <th className="px-4 py-3 text-left">Team</th>
            <th className="px-4 py-3 text-left">Position</th>
            <th className="px-4 py-3 text-left">Salary</th>
            <th className="px-4 py-3 text-left rounded-tr-lg">Points</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-highlight">
            <td className="px-4 py-3">Tom Brady</td>
            <td className="px-4 py-3">TB</td>
            <td className="px-4 py-3">QB</td>
            <td className="px-4 py-3">$11,200</td>
            <td className="px-4 py-3">23</td>
          </tr>
          {[...Array(7)].map((_, i) => (
            <tr key={i} className="bg-dark-gray">
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
  );
}
