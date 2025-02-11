import useCruiseApi from '@/app/api/useCruiseApi';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Cruise, SortingOption } from '@/app/definitions';

const useFilterAndSortCruises = () => {
  const { getCruises } = useCruiseApi();

  const [allCruises, setAllCruises] = useState<Cruise[]>([]); // Full list of cruises
  const [filteredCruises, setFilteredCruises] = useState<Cruise[]>([]); // Filtered list
  const [departurePort, setDeparturePort] = useState(''); // Departure port input value
  const [cruiseline, setCruiseline] = useState(''); // Cruiseline input value
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  ); // Debounce timeout

  const [cruiseSortSelectedOption, setCruiseSortSelectedOption] =
    useState<SortingOption | null>(null);

  // Fetch cruises on component mount
  useEffect(() => {
    (async () => {
      const cruises = await getCruises();
      setAllCruises(cruises);
      setFilteredCruises(cruises); // Initialize with all cruises
    })();
  }, []);

  // Filter cruises whenever departurePort or cruiseline changes
  useEffect(() => {
    // Clear the previous debounce timeout
    if (typingTimeout) clearTimeout(typingTimeout);

    // Set a new debounce timeout
    const timeout = setTimeout(() => {
      const filtered = allCruises.filter((cruise) => {
        let matchesPort = false;
        if (cruise.itinerary[0]) {
          matchesPort = departurePort
            ? cruise.itinerary[0]
                .toLowerCase()
                .includes(departurePort.toLowerCase())
            : true; // Match all ports if input is empty
        }

        let matchesCruiseline = false;
        if (cruise.ship.name) {
          matchesCruiseline = cruiseline
            ? cruise.ship.name.toLowerCase().includes(cruiseline.toLowerCase())
            : true; // Match all cruiselines if input is empty
        }

        return matchesPort && matchesCruiseline;
      });

      if (cruiseSortSelectedOption) {
        filtered.sort((a, b) => {
          switch (cruiseSortSelectedOption.value) {
            case 'price_lowest': // Sort by price in ascending order
              return a.price - b.price;
            case 'price_highest': // Sort by price in descending order
              return b.price - a.price;
            case 'duration_shortest': // Sort by duration in ascending order
              return a.duration - b.duration;
            case 'duration_longest': // Sort by duration in descending order
              return b.duration - a.duration;
            case 'departure_earliest': // Sort by earliest departure date
              return (
                new Date(a.departureDate).getTime() -
                new Date(b.departureDate).getTime()
              );
            case 'departure_latest': // Sort by latest departure date
              return (
                new Date(b.departureDate).getTime() -
                new Date(a.departureDate).getTime()
              );
            default:
              return 0; // No sorting
          }
        });
      }

      setFilteredCruises(filtered); // Update filtered list
    }, 300); // 300ms debounce

    setTypingTimeout(timeout);
  }, [departurePort, cruiseline, allCruises, cruiseSortSelectedOption]); // Dependencies include the filters and full list

  // Update departure port input
  const handleDeparturePortChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDeparturePort(e.target.value);
    },
    []
  );

  // Update cruiseline input
  const handleCruiselineChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCruiseline(e.target.value);
    },
    []
  );

  return {
    departurePortInputValue: departurePort,
    handleDeparturePortChange,
    cruiselineInputValue: cruiseline,
    handleCruiselineChange,
    filteredCruises,
    cruiseSortSelectedOption,
    setCruiseSortSelectedOption,
  };
};

export default useFilterAndSortCruises;
