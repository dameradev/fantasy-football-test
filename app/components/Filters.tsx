"use client";
import SelectDropdown from "./SelectDropdown";
import { PlayerFilter } from "../types/game-data";

type SlateOption = { id: number; name: string | number };

interface FiltersProps {
  filters?: PlayerFilter;
  operatorOptions: string[];
  gameTypeOptions: string[];
  slateOptions: SlateOption[]; 
  onChange: (next: PlayerFilter) => void;
}

export default function Filters({
  filters,
  operatorOptions,
  gameTypeOptions,
  slateOptions,
  onChange,
}: FiltersProps) {

  const slateDisabled = !filters?.gameType;

  return (
    <div className="max-w-fit p-6 rounded-lg self-center flex gap-4 mb-6 bg-dark-gray">
      <SelectDropdown
        options={operatorOptions}
        placeholder="Select Operator"
        value={filters?.operator}
        onChange={(operator) => onChange({ ...filters, operator, gameType: (filters?.gameType ?? undefined), slateId: (filters?.slateId ?? undefined) })}
      />
      <SelectDropdown
        options={gameTypeOptions}
        placeholder="Select Game Type"
        value={filters?.gameType}
        onChange={(gameType) =>
          onChange({
            ...filters,
            gameType,
            slateId: undefined,
          })
        }
      />
      <SelectDropdown
        options={slateOptions}
        placeholder="Select Slate Name"
        value={
          slateOptions.find(s => s.id === (filters?.slateId ?? -1)) ?? undefined
        }
        onChange={(opt) => onChange({ ...filters, slateId: (opt as SlateOption).id })}
        getLabel={(opt) => String((opt as SlateOption).name)}
        getValue={(opt) => String((opt as SlateOption).id)}
        className={slateDisabled ? "opacity-50 cursor-not-allowed" : ""}
      />
    </div>
  );
}
