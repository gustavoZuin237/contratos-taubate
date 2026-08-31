import { useEffect, useRef, useState } from "react";

import * as s from "./styles";

interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function Dropdown({ options, value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <s.Dropdown ref={dropdownRef}>
      <s.DropdownButton
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value || <i>--- Selecione uma opção ---</i>}

        <s.Arrow $isOpen={isOpen}>▼</s.Arrow>
      </s.DropdownButton>

      {isOpen && (
        <s.DropdownMenu>
          {options.map((option) => (
            <s.DropdownOption
              key={option}
              type="button"
              $selected={option === value}
              onClick={() => handleSelect(option)}
            >
              {option}
            </s.DropdownOption>
          ))}
        </s.DropdownMenu>
      )}
    </s.Dropdown>
  );
}
