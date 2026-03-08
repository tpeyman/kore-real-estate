export const PROPERTY_TYPES = [
  { label: 'Apartment', value: 'Apartment' },
  { label: 'Villa', value: 'Villa' },
  { label: 'Townhouse', value: 'Townhouse' },
  { label: 'Penthouse', value: 'Penthouse' },
] as const;

export const PROPERTY_TYPES_WITH_OTHER = [
  ...PROPERTY_TYPES,
  { label: 'Other', value: 'Other' },
];
