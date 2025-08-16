interface PlayerCardProps {
  name: string;
  points: number;
}

export default function PlayerCard({ name, points }: PlayerCardProps) {
  return (
    <div className="w-80 bg-dark-gray rounded-lg p-6">
      <div className="w-32 h-32 mx-auto mb-4 bg-dark-bg rounded-full flex items-center justify-center">
        <div className="text-xs text-center text-medium-gray">
          Player<br />Image
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">{name}</h2>
      </div>

      <div className="text-center">
        <div className="text-6xl font-bold text-white mb-2">{points}</div>
        <div className="text-sm text-medium-gray">Points</div>
      </div>
    </div>
  );
}
