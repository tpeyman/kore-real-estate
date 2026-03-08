export const BUY_PRICE_RANGES = [
  { label: 'Any Price', value: 'any' },
  { label: 'Under 500K AED', value: '0-500K' },
  { label: '500K – 1M AED', value: '500K-1M' },
  { label: '1M – 2M AED', value: '1M-2M' },
  { label: '2M – 5M AED', value: '2M-5M' },
  { label: '5M+ AED', value: '5M+' },
] as const;

export const RENT_PRICE_RANGES = [
  { label: 'Any Price', value: 'any' },
  { label: 'Under 50K AED', value: '0-50K' },
  { label: '50K – 100K AED', value: '50K-100K' },
  { label: '100K – 200K AED', value: '100K-200K' },
  { label: '200K+ AED', value: '200K+' },
] as const;
