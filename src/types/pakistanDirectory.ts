export interface DirectoryPlace {
  id: string;
  name: string;
  type: 'vet_clinic' | 'pet_shop';
  city: 'Lahore' | 'Karachi' | 'Islamabad' | 'Rawalpindi' | 'Multan' | 'Faisalabad' | 'Peshawar' | 'Quetta';
  area: string;
  address: string;
  phone: string;
  whatsapp: string; // international format e.g. 923001234567
  timings: string;
  is24x7Emergency: boolean;
  rating: number;
  reviewsCount: number;
  doctorName?: string;
  qualification?: string;
  image: string;
  servicesOrProducts: string[];
  googleMapsUrl: string;
  lat: number;
  lng: number;
}

export interface CityLocation {
  id: string;
  name: string;
  province: string;
  lat: number;
  lng: number;
  vetCount: number;
  shopCount: number;
}
