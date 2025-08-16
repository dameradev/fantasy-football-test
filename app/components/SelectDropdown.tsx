import { ChevronDown } from "lucide-react";

interface SelectDropdownProps {
  options: string[];
  placeholder: string;
  className?: string;
}

export default function SelectDropdown({ options, placeholder, className = "" }: SelectDropdownProps) {
  return (
    <div className="relative inline-block">
      <select className={`appearance-none text-white px-4 py-1 rounded bg-dark-bg pr-8 ${className}`}>
        <option>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
    </div>
  );
}
