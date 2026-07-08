export const breeds = [
  'Bhagnari',
  'Sahiwal',
  'Red Chittagong',
  'Kanchajuri',
  'Brahman',
  'Gaola',
  'Nili',
  'Kundi',
  'Banarasi',
  'Jhenaidah',
] as const;

export type BreedType = typeof breeds[number];