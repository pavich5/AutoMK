export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric' | 'lpg';
export type TransmissionType = 'manual' | 'automatic' | 'semi_automatic';
export type DriveType = 'fwd' | 'rwd' | 'awd';
export type BodyType = 'sedan' | 'suv' | 'hatchback' | 'coupe' | 'wagon' | 'van' | 'convertible' | 'pickup';
export type Condition = 'new' | 'used';
export type EmissionStandard = 'euro3' | 'euro4' | 'euro5' | 'euro6';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  priceEur: number;
  mileage: number;
  fuel: FuelType;
  transmission: TransmissionType;
  drive: DriveType;
  bodyType: BodyType;
  engineSize: number;
  power: number;
  emission: EmissionStandard;
  condition: Condition;
  firstOwner: boolean;
  accidentFree: boolean;
  serviceBook: boolean;
  imported: boolean;
  color: string;
  doors: number;
  seats: number;
  location: string;
  images: string[];
  description: string;
  equipment: string[];
  seller: {
    name: string;
    phone: string;
    type: 'private' | 'dealer';
  };
  featured: boolean;
  createdAt: Date;
}

export interface CarFilters {
  brands?: string[];
  models?: string[];
  priceFrom?: number;
  priceTo?: number;
  yearFrom?: number;
  yearTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
  locations?: string[];
  fuelTypes?: FuelType[];
  transmissions?: TransmissionType[];
  drives?: DriveType[];
  bodyTypes?: BodyType[];
  conditions?: Condition[];
  firstOwner?: boolean;
  accidentFree?: boolean;
  serviceBook?: boolean;
  imported?: boolean;
  colors?: string[];
  doorsFrom?: number;
  doorsTo?: number;
  seatsFrom?: number;
  seatsTo?: number;
  equipment?: string[];
}

export type SortOption = 'newest' | 'oldest' | 'price_low' | 'price_high' | 'mileage_low' | 'mileage_high' | 'year_new' | 'year_old';
