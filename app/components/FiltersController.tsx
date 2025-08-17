"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Filters from "./Filters";
import { PlayerFilter } from "../types/game-data";

type SlateOption = { id: number; name: string | number };

interface Props {
  operatorOptions: string[];
  gameTypeOptions: string[];
  slateOptions: SlateOption[];
}

export default function FiltersController({
  operatorOptions,
  gameTypeOptions,
  slateOptions,
}: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const current: PlayerFilter = {
    operator: sp.get("operator") || undefined,
    gameType: sp.get("gameType") || undefined,
    slateId: sp.get("slateId") ? Number(sp.get("slateId")) : undefined,
  };

  const apply = (next: PlayerFilter) => {
    const params = new URLSearchParams(sp.toString());

    const setOrDelete = (k: string, v?: string | number) => {
      if (v === undefined || v === "" || v === null) params.delete(k);
      else params.set(k, String(v));
    };

    if (next.operator !== current.operator) {
      setOrDelete("operator", next.operator);
      setOrDelete("gameType", undefined);
      setOrDelete("slateId", undefined);
      setOrDelete("selectedPlayerId", undefined);
    } else if (next.gameType !== current.gameType) {
      setOrDelete("gameType", next.gameType);
      setOrDelete("slateId", undefined);
      setOrDelete("selectedPlayerId", undefined);
    } else if (next.slateId !== current.slateId) {
      setOrDelete("slateId", next.slateId);
      setOrDelete("selectedPlayerId", undefined);
      if (current.operator) params.set("operator", current.operator);
      if (current.gameType) params.set("gameType", current.gameType);
    } else {
      setOrDelete("operator", next.operator);
      setOrDelete("gameType", next.gameType);
      setOrDelete("slateId", next.slateId);
    }

    params.delete("page");

    router.push(`?${params.toString()}`);
  };

  return (
    <Filters
      filters={current}
      operatorOptions={operatorOptions}
      gameTypeOptions={gameTypeOptions}
      slateOptions={slateOptions}
      onChange={apply}
    />
  );
}
