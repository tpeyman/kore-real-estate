export interface ProductPricing {
  type: string; // e.g. 'Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Mansions'
  unitTypes: string; // e.g. 'Studio → 4BR'
  minBudget: number; // in AED
  maxBudget: number; // in AED
}

export interface LocationData {
  name: string;
  value: string;
  products: ProductPricing[];
  notes?: string;
}

export const LOCATIONS: LocationData[] = [
  {
    name: 'Downtown Dubai',
    value: 'Downtown Dubai',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 4BR', minBudget: 1100000, maxBudget: 12000000 },
      { type: 'Penthouses', unitTypes: '3BR → 5BR+', minBudget: 8000000, maxBudget: 60000000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 6000000, maxBudget: 12000000 },
    ],
    notes: 'Premium towers (Burj Khalifa / Address branded) command 30–50% higher pricing.',
  },
  {
    name: 'Dubai Marina',
    value: 'Dubai Marina',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 4BR', minBudget: 900000, maxBudget: 7000000 },
      { type: 'Penthouses', unitTypes: '3BR → 5BR', minBudget: 7000000, maxBudget: 25000000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 4000000, maxBudget: 9000000 },
    ],
    notes: 'New waterfront towers can push 2BR units above 4M.',
  },
  {
    name: 'Palm Jumeirah',
    value: 'Palm Jumeirah',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 4BR', minBudget: 2800000, maxBudget: 18000000 },
      { type: 'Penthouses', unitTypes: '3BR → 6BR+', minBudget: 20000000, maxBudget: 150000000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 8000000, maxBudget: 20000000 },
      { type: 'Villas', unitTypes: '4BR → 7BR+', minBudget: 18000000, maxBudget: 200000000 },
    ],
    notes: 'Ultra-luxury branded residences can exceed AED 30M+ for large units.',
  },
  {
    name: 'Business Bay',
    value: 'Business Bay',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 4BR', minBudget: 950000, maxBudget: 8000000 },
      { type: 'Penthouses', unitTypes: '3BR → 6BR+', minBudget: 7000000, maxBudget: 40000000 },
    ],
    notes: 'Waterfront towers near the Dubai Canal command premium pricing.',
  },
  {
    name: 'Dubai Hills Estate',
    value: 'Dubai Hills Estate',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 4BR', minBudget: 1300000, maxBudget: 7000000 },
      { type: 'Townhouses', unitTypes: '3BR → 5BR', minBudget: 3200000, maxBudget: 7000000 },
      { type: 'Villas', unitTypes: '4BR → 7BR+', minBudget: 8000000, maxBudget: 60000000 },
    ],
  },
  {
    name: 'Jumeirah Village Circle (JVC)',
    value: 'JVC',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 4BR', minBudget: 550000, maxBudget: 3000000 },
      { type: 'Townhouses', unitTypes: '2BR → 4BR', minBudget: 1800000, maxBudget: 3800000 },
      { type: 'Villas', unitTypes: '4BR → 5BR', minBudget: 4000000, maxBudget: 7000000 },
    ],
    notes: 'Newer branded projects may exceed 2.5M+ for larger units.',
  },
  {
    name: 'Jumeirah Lake Towers (JLT)',
    value: 'JLT',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 4BR', minBudget: 900000, maxBudget: 6000000 },
      { type: 'Penthouses', unitTypes: '3BR → 5BR', minBudget: 5000000, maxBudget: 20000000 },
    ],
    notes: 'Cluster K, V, W waterfront towers command higher pricing.',
  },
  {
    name: 'Dubai Creek Harbour',
    value: 'Dubai Creek Harbour',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 4BR', minBudget: 1400000, maxBudget: 6000000 },
      { type: 'Penthouses', unitTypes: '3BR → 5BR', minBudget: 9000000, maxBudget: 35000000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 4000000, maxBudget: 7000000 },
    ],
    notes: 'Prices increase significantly in Creek Beach and waterfront towers.',
  },
  {
    name: 'Arjan',
    value: 'Arjan',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 480000, maxBudget: 2200000 },
    ],
    notes: 'Most supply consists of mid-rise buildings near Dubai Miracle Garden.',
  },
  {
    name: 'Motor City',
    value: 'Motor City',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 4BR', minBudget: 1100000, maxBudget: 4000000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 3000000, maxBudget: 5000000 },
      { type: 'Villas', unitTypes: '4BR → 5BR', minBudget: 5000000, maxBudget: 9000000 },
    ],
  },
  {
    name: 'Dubai Sports City',
    value: 'Dubai Sports City',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 420000, maxBudget: 1800000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 2000000, maxBudget: 3500000 },
      { type: 'Villas', unitTypes: '3BR → 5BR', minBudget: 3000000, maxBudget: 6000000 },
    ],
  },
  {
    name: 'Al Furjan',
    value: 'Al Furjan',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 650000, maxBudget: 2200000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 2700000, maxBudget: 4500000 },
      { type: 'Villas', unitTypes: '4BR → 6BR', minBudget: 4500000, maxBudget: 9000000 },
    ],
  },
  {
    name: 'Discovery Gardens',
    value: 'Discovery Gardens',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 2BR', minBudget: 480000, maxBudget: 1300000 },
    ],
    notes: 'Most buildings are older Nakheel developments with large layouts.',
  },
  {
    name: 'Dubai Production City',
    value: 'Dubai Production City',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 380000, maxBudget: 1800000 },
    ],
  },
  {
    name: 'Remraam',
    value: 'Remraam',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 3BR', minBudget: 750000, maxBudget: 1900000 },
      { type: 'Townhouses', unitTypes: '2BR → 3BR', minBudget: 1800000, maxBudget: 2800000 },
    ],
  },
  {
    name: 'Arabian Ranches',
    value: 'Arabian Ranches',
    products: [
      { type: 'Villas', unitTypes: '3BR → 7BR', minBudget: 4500000, maxBudget: 20000000 },
      { type: 'Townhouses', unitTypes: '2BR → 3BR', minBudget: 3500000, maxBudget: 6000000 },
    ],
  },
  {
    name: 'Arabian Ranches 2',
    value: 'Arabian Ranches 2',
    products: [
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 3200000, maxBudget: 4800000 },
      { type: 'Villas', unitTypes: '4BR → 6BR', minBudget: 5500000, maxBudget: 12000000 },
    ],
  },
  {
    name: 'Arabian Ranches 3',
    value: 'Arabian Ranches 3',
    products: [
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 2600000, maxBudget: 4200000 },
      { type: 'Villas', unitTypes: '4BR → 5BR', minBudget: 4500000, maxBudget: 8000000 },
    ],
    notes: 'Many units are still under construction / recently handed over.',
  },
  {
    name: 'DAMAC Hills',
    value: 'DAMAC Hills',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 650000, maxBudget: 2600000 },
      { type: 'Townhouses', unitTypes: '3BR → 5BR', minBudget: 2500000, maxBudget: 5500000 },
      { type: 'Villas', unitTypes: '4BR → 7BR+', minBudget: 5000000, maxBudget: 20000000 },
    ],
  },
  {
    name: 'DAMAC Hills 2',
    value: 'DAMAC Hills 2',
    products: [
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 1400000, maxBudget: 2400000 },
      { type: 'Villas', unitTypes: '3BR → 6BR', minBudget: 2200000, maxBudget: 4500000 },
    ],
    notes: 'One of the most affordable townhouse communities in Dubai.',
  },
  {
    name: 'Tilal Al Ghaf',
    value: 'Tilal Al Ghaf',
    products: [
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 3000000, maxBudget: 4500000 },
      { type: 'Villas', unitTypes: '4BR → 6BR', minBudget: 7000000, maxBudget: 18000000 },
      { type: 'Mansions', unitTypes: '6BR → 8BR+', minBudget: 30000000, maxBudget: 120000000 },
    ],
  },
  {
    name: 'Mudon',
    value: 'Mudon',
    products: [
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 2700000, maxBudget: 4000000 },
      { type: 'Villas', unitTypes: '4BR → 5BR', minBudget: 4500000, maxBudget: 7000000 },
    ],
  },
  {
    name: 'Villanova',
    value: 'Villanova',
    products: [
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 2300000, maxBudget: 3600000 },
      { type: 'Villas', unitTypes: '4BR → 5BR', minBudget: 3800000, maxBudget: 6000000 },
    ],
  },
  {
    name: 'The Villa (Dubailand)',
    value: 'The Villa',
    products: [
      { type: 'Villas', unitTypes: '4BR → 7BR', minBudget: 5000000, maxBudget: 14000000 },
    ],
    notes: 'Large Spanish-style villas developed by Dubai Properties.',
  },
  {
    name: 'Emaar Beachfront',
    value: 'Emaar Beachfront',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 4BR', minBudget: 2600000, maxBudget: 12000000 },
      { type: 'Penthouses', unitTypes: '4BR → 6BR+', minBudget: 15000000, maxBudget: 80000000 },
    ],
    notes: 'Sea-facing units command 20–35% premiums.',
  },
  {
    name: 'Bluewaters Island',
    value: 'Bluewaters Island',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 4BR', minBudget: 3000000, maxBudget: 13000000 },
      { type: 'Penthouses', unitTypes: '4BR → 6BR', minBudget: 18000000, maxBudget: 55000000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 8000000, maxBudget: 16000000 },
    ],
    notes: 'Premium units facing Ain Dubai achieve the highest pricing.',
  },
  {
    name: 'Jumeirah Islands',
    value: 'Jumeirah Islands',
    products: [
      { type: 'Villas', unitTypes: '4BR → 6BR', minBudget: 8000000, maxBudget: 25000000 },
    ],
    notes: 'Prices vary significantly based on lake frontage and renovations.',
  },
  {
    name: 'Jumeirah Park',
    value: 'Jumeirah Park',
    products: [
      { type: 'Villas', unitTypes: '3BR → 5BR', minBudget: 5000000, maxBudget: 12000000 },
    ],
    notes: 'Large plot sizes make this area attractive for European family buyers.',
  },
  {
    name: 'Jumeirah Golf Estates',
    value: 'Jumeirah Golf Estates',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 3BR', minBudget: 1300000, maxBudget: 3000000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 3500000, maxBudget: 6000000 },
      { type: 'Villas', unitTypes: '4BR → 7BR+', minBudget: 7000000, maxBudget: 40000000 },
    ],
    notes: 'Homes overlooking Earth Course golf course command premium pricing.',
  },
  {
    name: 'Dubai South',
    value: 'Dubai South',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 420000, maxBudget: 1800000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 1900000, maxBudget: 3300000 },
      { type: 'Villas', unitTypes: '4BR → 5BR', minBudget: 3300000, maxBudget: 6000000 },
    ],
  },
  {
    name: 'Dubailand',
    value: 'Dubailand',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 450000, maxBudget: 2000000 },
      { type: 'Townhouses', unitTypes: '3BR → 5BR', minBudget: 2000000, maxBudget: 4500000 },
      { type: 'Villas', unitTypes: '4BR → 7BR+', minBudget: 4000000, maxBudget: 12000000 },
    ],
    notes: 'Includes sub-communities: Villanova, The Villa, Majan, Falcon City, Rukan, Al Habtoor Polo Resort.',
  },
  {
    name: 'Majan',
    value: 'Majan',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 420000, maxBudget: 1600000 },
    ],
  },
  {
    name: 'Falcon City of Wonders',
    value: 'Falcon City of Wonders',
    products: [
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 2400000, maxBudget: 3800000 },
      { type: 'Villas', unitTypes: '4BR → 7BR', minBudget: 4500000, maxBudget: 9000000 },
    ],
  },
  {
    name: 'Rukan',
    value: 'Rukan',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 2BR', minBudget: 450000, maxBudget: 1200000 },
      { type: 'Townhouses', unitTypes: '2BR → 3BR', minBudget: 1300000, maxBudget: 2400000 },
    ],
  },
  {
    name: 'Al Habtoor Polo Resort & Club',
    value: 'Al Habtoor Polo Resort',
    products: [
      { type: 'Villas', unitTypes: '3BR → 6BR', minBudget: 5000000, maxBudget: 18000000 },
    ],
  },
];

/**
 * Parse a budget string like "2,000,000" or "2M" or "500K" into a number.
 */
export function parseBudget(input: string): number {
  if (!input) return 0;
  const cleaned = input.replace(/[^0-9.kmb]/gi, '');
  const lower = cleaned.toLowerCase();

  // Handle shorthand: 2.5m, 500k, 1b
  const mMatch = lower.match(/^([\d.]+)m$/);
  if (mMatch) return parseFloat(mMatch[1]) * 1_000_000;

  const kMatch = lower.match(/^([\d.]+)k$/);
  if (kMatch) return parseFloat(kMatch[1]) * 1_000;

  const bMatch = lower.match(/^([\d.]+)b$/);
  if (bMatch) return parseFloat(bMatch[1]) * 1_000_000_000;

  // Plain number
  const num = parseFloat(input.replace(/[^0-9.]/g, ''));
  return isNaN(num) ? 0 : num;
}

/**
 * Filter locations where at least one product's price range includes the given budget.
 * Returns location options with matching product info in the label.
 */
export function getLocationsByBudget(budget: number): { label: string; value: string; matchingProducts: string[] }[] {
  if (budget <= 0) {
    // No budget filter — return all locations
    return LOCATIONS.map(loc => ({
      label: loc.name,
      value: loc.value,
      matchingProducts: loc.products.map(p => p.type),
    }));
  }

  return LOCATIONS
    .map(loc => {
      const matching = loc.products.filter(p => budget >= p.minBudget && budget <= p.maxBudget);
      if (matching.length === 0) return null;
      return {
        label: loc.name,
        value: loc.value,
        matchingProducts: matching.map(p => p.type),
      };
    })
    .filter(Boolean) as { label: string; value: string; matchingProducts: string[] }[];
}

/**
 * Get all locations as simple QuestionOption[] (no budget filter).
 */
export function getAllLocationOptions(): { label: string; value: string }[] {
  return LOCATIONS.map(loc => ({ label: loc.name, value: loc.value }));
}
