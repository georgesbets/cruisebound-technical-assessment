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
