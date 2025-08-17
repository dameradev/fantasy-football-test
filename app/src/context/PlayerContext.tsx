"use client";

import { createContext, useContext } from "react";
import { SlatePlayer } from "../types";

interface PlayerSelectionContextType {
  selectedPlayerId?: number;
  onPlayerSelect: (player: SlatePlayer) => void;
}

const PlayerSelectionContext = createContext<PlayerSelectionContextType | undefined>(undefined);

export function usePlayerSelection() {
  const context = useContext(PlayerSelectionContext);
  if (context === undefined) {
    throw new Error("usePlayerSelection must be used within a PlayerSelectionWrapper");
  }
  return context;
}

export default PlayerSelectionContext;
