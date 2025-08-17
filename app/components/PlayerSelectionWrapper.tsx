// app/components/PlayerSelectionWrapper.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlatePlayer } from "../types";
import PlayerSelectionContext from "../context/PlayerContext";

interface PlayerSelectionWrapperProps {
  selectedPlayerId?: number;
  currentPage: number;
  children: React.ReactNode;
}

export default function PlayerSelectionWrapper({
  selectedPlayerId,
  currentPage,
  children,
}: PlayerSelectionWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPlayerSelect = (player: SlatePlayer) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedPlayerId === player.slatePlayerId) {
      params.delete("selectedPlayerId");
    } else {
      params.set("selectedPlayerId", String(player.slatePlayerId));
    }

    const qs = params.toString();
    router.push(`/players/${currentPage}${qs ? `?${qs}` : ""}`);
  };

  return (
    <PlayerSelectionContext.Provider value={{ selectedPlayerId, onPlayerSelect }}>
      {children}
    </PlayerSelectionContext.Provider>
  );
}
