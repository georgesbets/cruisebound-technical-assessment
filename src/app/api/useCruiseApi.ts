import { Cruise, RawCruise } from '@/app/definitions';

const useCruiseApi = () => {
  const getCruises = async () => {
    const response = await fetch('/api/sandboxProxy', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('failed to fetch ');
    } else {
      const responseJson = await response.json();

      return responseJson.results.map(
        (cruise: RawCruise): Cruise => ({
          ...cruise,
          departureDate: new Date(cruise.departureDate),
          returnDate: new Date(cruise.returnDate),
        })
      );
    }
  };

  return {
    getCruises,
  };
};

export default useCruiseApi;
