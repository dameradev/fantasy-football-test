import { ChevronDown } from "lucide-react";

interface SelectDropdownProps<T = string> {
  options: T[];
  placeholder: string;
  className?: string;
  value?: T;
  onChange?: (value: T | undefined) => void;
  getLabel?: (option: T) => string;
  getValue?: (option: T) => string | number;
  disabled?: boolean;
}

export default function SelectDropdown<T = string>({ 
  options, 
  placeholder, 
  value,
  onChange,
  getLabel = (option: T) => String(option),
  getValue = (option: T) => String(option),
  className = "",
  disabled = false
}: SelectDropdownProps<T>) {
  return (
    <div className="relative inline-block">
      <select 
        className={`appearance-none text-white px-4 py-1 rounded bg-dark-bg pr-8 w-[200px] ${className}`}
        value={value ? getValue(value) : ''}
        onChange={(e) => {
          if (onChange && !disabled) {
            if (e.target.value === "remove-option") {
              onChange(undefined);
              return;
            }
            const selectedOption = options.find(option => getValue(option) === e.target.value);
            if (selectedOption) {
              onChange(selectedOption);
            }
          }
        }}
        disabled={disabled}
      >
        <option value="remove-option">{placeholder}</option>
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
