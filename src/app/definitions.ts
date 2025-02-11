export type Cruise = {
  price: number;
  name: string;
  ship: Ship;
  itinerary: string[];
  region: string;
  departureDate: Date;
  returnDate: Date;
  duration: number;
};

export type Ship = {
  name: string;
  rating: number;
  reviews: number;
  image: string;
  line: Line;
};

export type Line = {
  logo: string;
  name: string;
};

export type SortingOption = {
  label: string;
  value: string;
};

export const cruiseSortingOptions: SortingOption[] = [
  { label: 'Price: Lowest First', value: 'price_lowest' },
  { label: 'Price: Highest First', value: 'price_highest' },
  { label: 'Departure Date: Earliest First', value: 'departure_earliest' },
  { label: 'Departure Date: Latest First', value: 'departure_latest' },
  { label: 'Duration: Shortest First', value: 'duration_shortest' },
  { label: 'Duration: Longest First', value: 'duration_longest' },
];
