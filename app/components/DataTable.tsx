"use client";

import { SlatePlayer } from "../types";
import { usePlayerSelection } from "../context/PlayerContext";
interface DataTableProps {
  players: SlatePlayer[];
}

export default function DataTable({ players }: DataTableProps) {
  const { selectedPlayerId, onPlayerSelect } = usePlayerSelection();

  return (
    <div className="overflow-hidden">
      <table className="w-full rounded-t-lg">
        <thead className="bg-dark-bg">
          <tr>
            <th className="px-6 py-3 text-left font-normal  rounded-tl-lg">Name</th>
            <th className="px-6 py-3 text-center font-normal">Team</th>
            <th className="px-6 py-3 text-center font-normal">Position</th>
            <th className="px-6 py-3 text-left font-normal">Salary</th>
            <th className="px-6 py-3 text-right font-normal rounded-tr-lg">Points</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            const isSelected = selectedPlayerId === player.slatePlayerId;
            return (
              <tr
                key={player.slatePlayerId}
                className={`bg-dark-gray cursor-pointer transition-colors hover:bg-dark-bg ${
                  !isSelected ? "bg-dark-bg" : "bg-highlight"
                }`}
                onClick={() => onPlayerSelect(player)}
                aria-selected={isSelected}
                role="row"
              >
                <td className="px-6 py-3">{player.operatorPlayerName}</td>
                <td className="px-6 py-3 text-center">{player.team || "N/A"}</td>
                <td className="px-6 py-3 text-center">{player.operatorPosition}</td>
                <td className="px-6 py-3">
                  {player.operatorSalary > 0 ? `$${player.operatorSalary.toLocaleString()}` : "N/A"}
                </td>
                <td className="px-6 py-3 text-right">{player.fantasyPoints || 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
