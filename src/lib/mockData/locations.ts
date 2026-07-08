export const locations = [
  'Dhaka',
  'Chittagong',
  'Khulna',
  'Rajshahi',
  'Sylhet',
  'Barisal',
  'Rangpur',
  'Comilla',
  'Pabna',
  'Jamalpur',
  'Narayanganj',
  'Tangail',
  'Mymensingh',
  'Faridpur',
] as const;

export type LocationType = typeof locations[number];