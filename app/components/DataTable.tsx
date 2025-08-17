import { SlatePlayer } from '../types';
interface DataTableProps {
  players: SlatePlayer[];
}

export default function DataTable({ players }: DataTableProps) {
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
          {players.map((player, index) => (
            <tr key={player.slatePlayerId} className={'bg-dark-gray'}>
              <td className="px-4 py-3">{player.operatorPlayerName}</td>
              <td className="px-4 py-3">{player.team || 'N/A'}</td>
              <td className="px-4 py-3">{player.operatorPosition}</td>
              <td className="px-4 py-3">
                {player.operatorSalary > 0 ? `$${player.operatorSalary.toLocaleString()}` : 'N/A'}
              </td>
              <td className="px-4 py-3">{player.fantasyPoints || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
