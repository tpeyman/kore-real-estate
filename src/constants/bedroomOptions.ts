export interface BedroomOption {
  label: string;
  value: string;
}

export const APARTMENT_BEDROOMS: BedroomOption[] = [
  { label: 'Studio', value: 'Studio' },
  { label: '1 Bedroom', value: '1' },
  { label: '2 Bedrooms', value: '2' },
  { label: '3 Bedrooms', value: '3' },
  { label: '4 Bedrooms', value: '4' },
  { label: '4+ Bedrooms', value: '4+' },
];

export const PENTHOUSE_BEDROOMS: BedroomOption[] = [
  { label: '2 Bedrooms', value: '2' },
  { label: '3 Bedrooms', value: '3' },
  { label: '4 Bedrooms', value: '4' },
  { label: '4+ Bedrooms', value: '4+' },
];

export const VILLA_BEDROOMS: BedroomOption[] = [
  { label: '2 Bedrooms', value: '2' },
  { label: '3 Bedrooms', value: '3' },
  { label: '4 Bedrooms', value: '4' },
  { label: '5 Bedrooms', value: '5' },
  { label: '6+ Bedrooms', value: '6+' },
];

export const TOWNHOUSE_BEDROOMS: BedroomOption[] = [
  { label: '2 Bedrooms', value: '2' },
  { label: '3 Bedrooms', value: '3' },
  { label: '4 Bedrooms', value: '4' },
  { label: '5 Bedrooms', value: '5' },
];

// Default fallback (all possible options)
export const ALL_BEDROOMS: BedroomOption[] = [
  { label: 'Studio', value: 'Studio' },
  { label: '1 Bedroom', value: '1' },
  { label: '2 Bedrooms', value: '2' },
  { label: '3 Bedrooms', value: '3' },
  { label: '4 Bedrooms', value: '4' },
  { label: '5 Bedrooms', value: '5' },
  { label: '6+ Bedrooms', value: '6+' },
];

/**
 * Get bedroom options for a given property type.
 * Returns the correct subset based on Dubai market rules.
 */
export function getBedroomsForPropertyType(propertyType: string): BedroomOption[] {
  switch (propertyType) {
    case 'Apartment':
      return APARTMENT_BEDROOMS;
    case 'Penthouse':
      return PENTHOUSE_BEDROOMS;
    case 'Villa':
      return VILLA_BEDROOMS;
    case 'Townhouse':
      return TOWNHOUSE_BEDROOMS;
    default:
      return ALL_BEDROOMS;
  }
}
