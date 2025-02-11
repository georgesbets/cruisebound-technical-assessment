import * as React from 'react';
import { SortingOption } from '@/app/definitions';
import SortCruisesMenuComponent from '@/app/components/SortCruisesMenuComponent';

interface CruiseFilterAndSortControlsProps {
  filteredCruiseCount: number;
  selectedOption: SortingOption | null;
  setSelectedOption: (option: SortingOption) => void;
  sortingOptions: SortingOption[];
  resetFilters: () => void;
}

const CruiseFilterAndSortControls = (
  props: CruiseFilterAndSortControlsProps
) => {
  const {
    filteredCruiseCount,
    selectedOption,
    setSelectedOption,
    sortingOptions,
    resetFilters,
  } = props;

  return (
    <div className={'inline-block'}>
      <div className={'font-700'}>Sort by</div>
      <SortCruisesMenuComponent
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        sortingOptions={sortingOptions}
      />
      <div className={'inline-block'}>
        <div>{`${filteredCruiseCount} trips found`}</div>
        <button
          onClick={resetFilters}
          className={
            'rounded border-[1px] border-gray-200 bg-white shadow text-sm pr-[2px] pl-[2px]'
          }
        >
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default CruiseFilterAndSortControls;
