import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SortingOption } from '@/app/definitions';

interface SortCruisesMenuComponentProps {
  selectedOption: SortingOption | null;
  setSelectedOption: (option: SortingOption) => void;
  sortingOptions: SortingOption[];
}

const SortCruisesMenuComponent = (props: SortCruisesMenuComponentProps) => {
  const { selectedOption, setSelectedOption, sortingOptions } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Handles closing the menu if clicking outside
  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickAway);
    return () => {
      window.removeEventListener('mousedown', handleClickAway);
    };
  }, []);

  const handleButtonClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleOptionClick = useCallback(
    (option: SortingOption) => {
      if (selectedOption?.value !== option.value) {
        setSelectedOption(option);
      }
      setIsMenuOpen(false);
    },
    [selectedOption?.value, setSelectedOption]
  );

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleButtonClick}
      >
        {selectedOption ? selectedOption.label : 'Sort Options'}
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg">
          {sortingOptions.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedOption?.value === option.value
                  ? 'bg-gray-200 font-semibold'
                  : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortCruisesMenuComponent;
