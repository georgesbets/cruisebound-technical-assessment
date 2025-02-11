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
    <div className={'flex flex-col w-[100%]'}>
      <div className={'w-[100%] flex items-center justify-end'}>
        <div className={'text-[20px] pr-[10px]'}>Sort by</div>
        <SortCruisesMenuComponent
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          sortingOptions={sortingOptions}
        />
      </div>
      <div className={'w-[100%] flex pb-4'}>
        <div
          className={'font-bold pr-3'}
        >{`${filteredCruiseCount} trips found`}</div>
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
