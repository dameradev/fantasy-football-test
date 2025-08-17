import { SlatePlayer } from '../types';

interface PlayerProps {
  player?: SlatePlayer;
}

export default function Player({ player }: PlayerProps) {
  return (
    <div className="w-80 bg-dark-gray rounded-lg p-6">
      <div className="w-32 h-32 mx-auto mb-4 bg-dark-bg rounded-full flex items-center justify-center">
        <div className="text-xs text-center text-medium-gray">
          Player<br />Image
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">{player?.operatorPlayerName}</h2>
        <p className="text-sm text-medium-gray">{player?.operatorPosition} • {player?.team || 'N/A'}</p>
      </div>

      <div className="text-center">
        <div className="text-6xl font-bold text-white mb-2">
          {player?.fantasyPoints || 0}
        </div>
        <div className="text-sm text-medium-gray">Points</div>
        {player?.operatorSalary && player?.operatorSalary > 0 && (
          <div className="text-sm text-medium-gray mt-2">
            Salary: ${player?.operatorSalary.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}
