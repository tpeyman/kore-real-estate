export const BEDROOM_OPTIONS = [
  { label: 'Studio', value: 'Studio' },
  { label: '1 Bedroom', value: '1' },
  { label: '2 Bedrooms', value: '2' },
  { label: '3 Bedrooms', value: '3' },
  { label: '4 Bedrooms', value: '4' },
  { label: '4+ Bedrooms', value: '4+' },
] as const;

export const BEDROOM_OPTIONS_MUTABLE = BEDROOM_OPTIONS.map(o => ({ ...o }));
