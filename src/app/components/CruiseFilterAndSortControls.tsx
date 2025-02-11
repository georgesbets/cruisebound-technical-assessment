import * as React from 'react';
import { SortingOption } from '@/app/definitions';
import SortCruisesMenuComponent from '@/app/components/SortCruisesMenuComponent';

interface CruiseFilterAndSortControlsProps {
  filteredCruiseCount: number;
  selectedOption: SortingOption | null;
  setSelectedOption: (option: SortingOption) => void;
  sortingOptions: SortingOption[];
}

const CruiseFilterAndSortControls = (
  props: CruiseFilterAndSortControlsProps
) => {
  const {
    filteredCruiseCount,
    selectedOption,
    setSelectedOption,
    sortingOptions,
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
      </div>
    </div>
  );
};

export default CruiseFilterAndSortControls;
