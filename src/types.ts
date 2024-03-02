export interface PriceListEntry {
  intervalStart: string;
  intervalEnd: string;
  pricePerNight: number;
}

export interface Amenities {
  airConditioning: boolean;
  parkingSpace: boolean;
  pets: boolean;
  pool: boolean;
  wifi: boolean;
  tv: boolean;
}

export interface AvailableDate {
  intervalStart: string;
  intervalEnd: string;
}

export interface Accommodation {
  id: number;
  title: string;
  image: string;
  capacity: number;
  beachDistanceInMeters: number | null;
  amenities: {
    airConditioning: boolean;
    parkingSpace: boolean;
    pets: boolean;
    pool: boolean;
    wifi: boolean;
    tv: boolean;
  };
  pricelistInEuros: PriceListEntry[];
  availableDates: AvailableDate[];
}

export interface DateState {
  startDate: Date | null;
  endDate: Date | null;
}
export interface PriceListEntry {
  intervalStart: string;
  intervalEnd: string;
  pricePerNight: number;
}
export interface ReservationDetails {
  accommodation: Accommodation;
  totalPrice: number;
  startDate: Date;
  endDate: Date;
}
