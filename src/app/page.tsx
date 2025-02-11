'use client';
import CruisePaginationComponent from '@/app/components/cruisePaginationComponent';
import useFilterAndSortCruises from '@/app/hooks/useFilterAndSortCruises';
import { cruiseSortingOptions } from '@/app/definitions';
import CruiseFilterAndSortControls from '@/app/components/CruiseFilterAndSortControls';

export default function Home() {
  const {
    departurePortInputValue,
    handleDeparturePortChange,
    cruiselineInputValue,
    handleCruiselineChange,
    filteredCruises,
    cruiseSortSelectedOption,
    setCruiseSortSelectedOption,
    resetFilters,
  } = useFilterAndSortCruises();

  return (
    <div className="flex min-h-svh ">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <ul className="mt-4 space-y-2">
          <div className="list-component">
            <div className="departure-port">
              <label
                htmlFor="departure-port"
                className="block mb-2 font-medium"
              >
                Departure Port
              </label>
              <input
                type="text"
                id="departure-port"
                value={departurePortInputValue}
                onChange={handleDeparturePortChange} // Update filter state
                placeholder="Any Port"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              />
            </div>
            <div className="cruiseline mt-4">
              <label htmlFor="cruiseline" className="block mb-2 font-medium">
                Cruiseline
              </label>
              <input
                type="text"
                id="cruiseline"
                value={cruiselineInputValue}
                onChange={handleCruiselineChange} // Update filter state
                placeholder="Any Ship"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              />
            </div>
          </div>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-3/4 p-4 items-end">
        <CruiseFilterAndSortControls
          setSelectedOption={setCruiseSortSelectedOption}
          selectedOption={cruiseSortSelectedOption}
          filteredCruiseCount={filteredCruises.length}
          sortingOptions={cruiseSortingOptions}
          resetFilters={resetFilters}
        />
        <CruisePaginationComponent cruises={filteredCruises} />
      </div>
    </div>
  );
}
