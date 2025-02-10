const useCruiseApi = () => {
  const getCruises = async () => {
    const response = await fetch('https://sandbox.cruisebound-qa.com/sailings');

    if (!response.ok) {
      throw new Error('failed to fetch ');
    } else {
      const responseJson = await response.json();

      return responseJson.results;
    }
  };

  return {
    getCruises,
  };
};

export default useCruiseApi;
