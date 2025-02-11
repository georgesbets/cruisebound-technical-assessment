import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { SortingOption } from '@/app/definitions';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  const selectedOptionDisplayedText = useMemo(() => {
    return (
      <div className={'flex grid-cols-2 flex-row'}>
        <div className={'flex flex-col col-span-1 items-start'}>
          {selectedOption ? (
            <>
              <div className={'leading-none'}>{selectedOption.property}</div>
              <div className={'text-gray-500 leading-none text-xs'}>
                {selectedOption.label}
              </div>
            </>
          ) : (
            <div className={'leading-none text-sm'}>Sort Options</div>
          )}
        </div>
        <div className={'col-span-1 text-gray-500 ml-[10px] mr-[-5px]'}>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
    );
  }, [selectedOption]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className={
          'w-[120px] px-4 py-2 rounded border-[1px] border-gray-200 bg-white shadow'
        }
        onClick={handleButtonClick}
      >
        {selectedOptionDisplayedText}
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
              {`${option.property}: ${option.label}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortCruisesMenuComponent;
