'use client';
import CruisePaginationComponent from '@/app/components/cruisePaginationComponent';
import useFilterAndSortCruises from '@/app/hooks/useFilterAndSortCruises';
import { cruiseSortingOptions } from '@/app/definitions';
import CruiseFilterAndSortControls from '@/app/components/cruiseFilterAndSortControls';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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

  // State for collapsible sidebar
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarCollapsed ? 'w-16' : 'w-1/4'
        } ${isSidebarCollapsed ? 'min-w-[64px]' : 'min-w-[195px]'} bg-gray-800 text-white p-6 ${isSidebarCollapsed ? 'p-[14px]' : ''} transition-all duration-300`}
      >
        <div className={'flex justify-end items-center'}>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className=" flex text-white focus:outline-none rounded-lg bg-gray-700 p-2 items-center"
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              fontSize={'25px'}
              className={`transform transition-transform duration-700 ${
                !isSidebarCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {!isSidebarCollapsed && (
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
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-3/4 min-w-[515px] p-6 pr-8 items-end">
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
