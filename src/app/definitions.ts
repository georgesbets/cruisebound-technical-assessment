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

export type RawCruise = {
  price: number;
  name: string;
  ship: Ship;
  itinerary: string[];
  region: string;
  departureDate: string;
  returnDate: string;
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
  property: string;
};

export const cruiseSortingOptions: SortingOption[] = [
  { property: 'Price', label: 'Lowest first', value: 'price_lowest' },
  { property: 'Price', label: 'Highest first', value: 'price_highest' },
  {
    property: 'Departure',
    label: 'Earliest first',
    value: 'departure_earliest',
  },
  {
    property: 'Departure',
    label: 'Latest first',
    value: 'departure_latest',
  },
  { property: 'Duration', label: 'Shortest first', value: 'duration_shortest' },
  { property: 'Duration', label: 'Longest first', value: 'duration_longest' },
];
