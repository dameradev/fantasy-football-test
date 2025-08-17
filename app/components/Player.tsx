"use client";
import { SlatePlayer } from '../types';
import { useEffect, useState } from 'react';
import Image from 'next/image';
interface PlayerProps {
  player?: SlatePlayer;
}

export default function Player({ player }: PlayerProps) {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const seed = Math.floor(Math.random() * 1000);
    const picsumUrl = `https://picsum.photos/seed/${seed}/128/128`;
    setImageUrl(picsumUrl);
  }, [player]);
  
  return (
    <div className="h-[500px] w-80 bg-dark-gray rounded-lg overflow-hidden">
      <div className="h-[50%] bg-dark-bg flex items-center justify-center overflow-hidden">
        {imageUrl && player ? (
          <Image 
            src={imageUrl} 
            width={160}
            height={160}
            alt="Player" 
            className="w-full h-full object-cover"
            onError={() => setImageUrl('')}
          />
        ) : player ? (
          <div className="text-xs text-center text-medium-gray">
            Could not load image
          </div>
        ) : <div>
          <div className="text-xs text-center text-medium-gray">
            No Player Selected
          </div>
        </div>
        }
      </div>
      <div className="h-[50%] p-6 flex flex-col justify-between text-center">
        <div className="text-2xl text-white mb-2">
          {player?.operatorPlayerName || "N/A"}
        </div>
        <div className="text-[100px]  text-white mb-2">
          {player?.fantasyPoints || 0}
          <p className="text-sm text-medium-gray">Points</p>
        </div>
      </div>
    </div>
  );
}