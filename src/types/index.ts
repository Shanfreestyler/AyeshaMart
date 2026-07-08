export interface ICattle {
  id: string;
  name: string;
  breed: string;
  price: number;
  location: string;
  status: 'available' | 'sold';
  images: string[];
  specs: {
    weightKg: number;
    ageMonths: number;
    estimatedMeatYieldKg: number;
    fatRatio: number;
  };
  valueScore: number;
  sellerId: string;
}

export interface ISeller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  contacts: {
    phone: string;
    email: string;
  };
}

export interface IFilterOptions {
  breed?: string;
  location?: string;
  status?: 'available' | 'sold';
  minPrice?: number;
  maxPrice?: number;
}

export interface ISortOption {
  value: string;
  label: string;
}