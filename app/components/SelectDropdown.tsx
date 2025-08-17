import { ChevronDown } from "lucide-react";

interface SelectDropdownProps<T = string> {
  options: T[];
  placeholder: string;
  className?: string;
  value?: T;
  onChange?: (value: T) => void;
  getLabel?: (option: T) => string;
  getValue?: (option: T) => string | number;
}

export default function SelectDropdown<T = string>({ 
  options, 
  placeholder, 
  className = "",
  value,
  onChange,
  getLabel = (option: T) => String(option),
  getValue = (option: T) => String(option)
}: SelectDropdownProps<T>) {
  return (
    <div className="relative inline-block">
      <select 
        className={`appearance-none text-white px-4 py-1 rounded bg-dark-bg pr-8 ${className}`}
        value={value ? getValue(value) : ''}
        onChange={(e) => {
          if (onChange) {
            const selectedOption = options.find(option => getValue(option) === e.target.value);
            if (selectedOption) {
              onChange(selectedOption);
            }
          }
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={getValue(option)}>
            {getLabel(option)}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
    </div>
  );
}
