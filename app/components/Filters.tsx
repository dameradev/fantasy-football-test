"use client"
import SelectDropdown from "./SelectDropdown";
import { PlayerPosition, PlayerFilter } from "../types";

interface FiltersProps {
  filters?: PlayerFilter;
}

export default function     Filters({ filters}: FiltersProps) {
  const positionOptions: PlayerPosition[] = ['QB', 'RB', 'WR', 'TE', 'WR/TE'];

  return (
    <div className="max-w-fit p-6 rounded-lg self-center flex gap-4 mb-6 bg-dark-gray">
      <SelectDropdown 
        options={positionOptions}
        placeholder="Select Operator"
        value={filters?.position}
        onChange={()=>{}}
      />
      <SelectDropdown 
        options={positionOptions}
        placeholder="Select Game Type"
        value={filters?.position}
        onChange={()=>{}}
      />
      
      <SelectDropdown 
        options={positionOptions}
        placeholder="Select Slate Name"
        value={filters?.position}
        onChange={()=>{}}
      />  
    </div>
  );
}
