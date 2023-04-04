export interface Info {
  bride: Person;
  groom: Person;
  location: Location;
  time: string;
}

export interface Person {
  name: string;
  age?: number;
  mom?: string;
  dad?: string;
}

export interface Location {
  title: string;
  address: string;
  long: number;
  lat: number;
}
