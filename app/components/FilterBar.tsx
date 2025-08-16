import SelectDropdown from "./SelectDropdown";

export default function FilterBar() {
  const operatorOptions = ["Operator 1", "Operator 2", "Operator 3"];
  const gameTypeOptions = ["NFL", "NBA", "MLB", "NHL"];
  const slateNameOptions = ["Main Slate", "Early Slate", "Late Slate"];

  return (
    <div className="max-w-fit p-6 rounded-lg self-center flex gap-4 mb-6 bg-dark-gray">
      <SelectDropdown 
        options={operatorOptions} 
        placeholder="Select Operator" 
      />
      <SelectDropdown 
        options={gameTypeOptions} 
        placeholder="Select Game Type" 
      />
      <SelectDropdown 
        options={slateNameOptions} 
        placeholder="Select Slate Name" 
      />
    </div>
  );
}
