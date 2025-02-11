import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import CruiseResultCard from '@/app/components/cruiseResultCard';
import { Cruise } from '@/app/definitions';

interface PaginationProps {
  cruises: Cruise[];
}

const CruisePaginationComponent = ({ cruises }: PaginationProps) => {
  const pageSize = 10; // Number of results per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [cruises]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.max(Math.ceil(cruises.length / pageSize), 1);
  }, [cruises]);

  // Get cruises for the current page
  const getPageData = useCallback(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return cruises.slice(startIndex, startIndex + pageSize);
  }, [cruises, currentPage]);

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  // Render pagination controls with custom behavior
  const renderPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      // If total pages are 5 or less, simply show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`px-2 py-1 ${currentPage === i ? 'bg-white' : 'bg-gray-100'} rounded-full text-sm`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // If total pages are more than 5, handle different cases
      if (currentPage <= 3) {
        // Case 1: First three pages
        for (let i = 1; i <= 4; i++) {
          pages.push(
            <button
              key={i}
              className={`px-2 py-1 ${currentPage === i ? 'bg-white' : 'bg-gray-100'} rounded-full text-sm`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          );
        }
        pages.push(
          <span key="ellipsis-end" className="px-1 py-1 text-gray-500 text-sm">
            ...
          </span>
        );
        pages.push(
          <button
            key={totalPages}
            className={`px-2 py-1 ${currentPage === totalPages ? 'bg-white' : 'bg-gray-100'} text-black rounded-full text-sm`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 2) {
        // Case 2: Last three pages
        pages.push(
          <button
            key={1}
            className={`px-2 py-1 ${currentPage === 1 ? 'bg-white' : 'bg-gray-100'} text-black rounded-full text-sm`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        );
        pages.push(
          <span
            key="ellipsis-start"
            className="px-1 py-1 text-gray-500 text-sm"
          >
            ...
          </span>
        );
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(
            <button
              key={i}
              className={`px-2 py-1 ${currentPage === i ? 'bg-white' : 'bg-gray-100'} rounded-full text-sm`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          );
        }
      } else {
        // Case 3: Middle pages
        pages.push(
          <button
            key={1}
            className={`px-2 py-1 ${currentPage === 1 ? 'bg-white' : 'bg-gray-100'} text-black rounded-full text-sm`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        );
        pages.push(
          <span
            key="ellipsis-start"
            className="px-1 py-1 text-gray-500 text-sm"
          >
            ...
          </span>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(
            <button
              key={i}
              className={`px-2 py-1 ${currentPage === i ? 'bg-white' : 'bg-gray-100'} rounded-full text-sm`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          );
        }
        pages.push(
          <span key="ellipsis-end" className="px-1 py-1 text-gray-500 text-sm">
            ...
          </span>
        );
        pages.push(
          <button
            key={totalPages}
            className={`px-2 py-1 ${currentPage === totalPages ? 'bg-white' : 'bg-gray-100'} text-black rounded-full text-sm`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  // Render cruises for the current page
  const renderResults = useMemo(() => {
    return getPageData().map((cruise, index) => (
      <div key={`${cruise.name}-${index}`} className="mb-4">
        <CruiseResultCard cruise={cruise} />
      </div>
    ));
  }, [getPageData]);

  return (
    <div className={'w-[100%]'}>
      {/* Render cruise results */}
      <div>{renderResults}</div>

      {/* Render pagination controls */}
      <div className="inline-block justify-center items-center mt-6 p-2 rounded-md bg-gray-100 space-x-2">
        {/* Previous arrow */}
        <button
          className="px-2 py-1 text-black rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            fontSize={'14px'}
            style={{ color: 'blue' }}
          />
        </button>

        {/* Page numbers */}
        {renderPagination()}

        {/* Next arrow */}
        <button
          className="px-2 py-1  rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            fontSize={'14px'}
            style={{ color: 'blue' }}
          />
        </button>
      </div>
    </div>
  );
};

export default CruisePaginationComponent;
