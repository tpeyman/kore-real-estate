export interface ProductPricing {
  type: string; // e.g. 'Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Mansions'
  unitTypes: string; // e.g. 'Studio → 4BR'
  minBudget: number; // in AED (purchase)
  maxBudget: number; // in AED (purchase)
  minRent?: number; // annual rent in AED
  maxRent?: number; // annual rent in AED
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
      { type: 'Apartments', unitTypes: 'Studio → 4BR', minBudget: 1100000, maxBudget: 12000000, minRent: 75000, maxRent: 600000 },
      { type: 'Penthouses', unitTypes: '3BR → 5BR+', minBudget: 8000000, maxBudget: 60000000, minRent: 600000, maxRent: 2000000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 6000000, maxBudget: 12000000 },
    ],
    notes: 'Premium towers (Burj Khalifa / Address branded) command 30–50% higher pricing.',
  },
  {
    name: 'Dubai Marina',
    value: 'Dubai Marina',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 4BR', minBudget: 900000, maxBudget: 7000000, minRent: 80000, maxRent: 500000 },
      { type: 'Penthouses', unitTypes: '3BR → 5BR', minBudget: 7000000, maxBudget: 25000000, minRent: 350000, maxRent: 1000000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 4000000, maxBudget: 9000000 },
    ],
    notes: 'One of Dubai\'s most popular waterfront rental communities.',
  },
  {
    name: 'Palm Jumeirah',
    value: 'Palm Jumeirah',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 4BR', minBudget: 2800000, maxBudget: 18000000, minRent: 150000, maxRent: 900000 },
      { type: 'Penthouses', unitTypes: '3BR → 6BR+', minBudget: 20000000, maxBudget: 150000000, minRent: 600000, maxRent: 3000000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 8000000, maxBudget: 20000000 },
      { type: 'Villas', unitTypes: '4BR → 7BR+', minBudget: 18000000, maxBudget: 200000000, minRent: 450000, maxRent: 2000000 },
    ],
    notes: 'Ultra-luxury beachfront community.',
  },
  {
    name: 'Business Bay',
    value: 'Business Bay',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 4BR', minBudget: 950000, maxBudget: 8000000, minRent: 70000, maxRent: 300000 },
      { type: 'Penthouses', unitTypes: '3BR → 6BR+', minBudget: 7000000, maxBudget: 40000000, minRent: 350000, maxRent: 1000000 },
    ],
    notes: 'Business district near Downtown.',
  },
  {
    name: 'Dubai Hills Estate',
    value: 'Dubai Hills Estate',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 4BR', minBudget: 1300000, maxBudget: 7000000, minRent: 85000, maxRent: 260000 },
      { type: 'Townhouses', unitTypes: '3BR → 5BR', minBudget: 3200000, maxBudget: 7000000, minRent: 220000, maxRent: 400000 },
      { type: 'Villas', unitTypes: '4BR → 7BR+', minBudget: 8000000, maxBudget: 60000000, minRent: 450000, maxRent: 1000000 },
    ],
    notes: 'Master community with parks and golf course.',
  },
  {
    name: 'Jumeirah Village Circle (JVC)',
    value: 'JVC',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 4BR', minBudget: 550000, maxBudget: 3000000, minRent: 40000, maxRent: 160000 },
      { type: 'Townhouses', unitTypes: '2BR → 4BR', minBudget: 1800000, maxBudget: 3800000, minRent: 140000, maxRent: 200000 },
      { type: 'Villas', unitTypes: '4BR → 5BR', minBudget: 4000000, maxBudget: 7000000, minRent: 200000, maxRent: 350000 },
    ],
    notes: 'One of Dubai\'s most affordable and fastest-growing rental areas.',
  },
  {
    name: 'Jumeirah Lake Towers (JLT)',
    value: 'JLT',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 4BR', minBudget: 900000, maxBudget: 6000000, minRent: 65000, maxRent: 260000 },
      { type: 'Penthouses', unitTypes: '3BR → 5BR', minBudget: 5000000, maxBudget: 20000000, minRent: 300000, maxRent: 600000 },
    ],
    notes: 'Popular expat community near Marina and metro.',
  },
  {
    name: 'Dubai Creek Harbour',
    value: 'Dubai Creek Harbour',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 4BR', minBudget: 1400000, maxBudget: 6000000, minRent: 95000, maxRent: 400000 },
      { type: 'Penthouses', unitTypes: '3BR → 5BR', minBudget: 9000000, maxBudget: 35000000, minRent: 400000, maxRent: 1000000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 4000000, maxBudget: 7000000 },
    ],
    notes: 'New waterfront development by Emaar.',
  },
  {
    name: 'Arjan',
    value: 'Arjan',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 480000, maxBudget: 2200000, minRent: 38000, maxRent: 150000 },
    ],
    notes: 'Affordable area near Miracle Garden.',
  },
  {
    name: 'Motor City',
    value: 'Motor City',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 4BR', minBudget: 1100000, maxBudget: 4000000, minRent: 70000, maxRent: 180000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 3000000, maxBudget: 5000000, minRent: 200000, maxRent: 300000 },
      { type: 'Villas', unitTypes: '4BR → 5BR', minBudget: 5000000, maxBudget: 9000000, minRent: 250000, maxRent: 400000 },
    ],
    notes: 'Family-oriented community with large layouts.',
  },
  {
    name: 'Dubai Sports City',
    value: 'Dubai Sports City',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 420000, maxBudget: 1800000, minRent: 35000, maxRent: 120000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 2000000, maxBudget: 3500000, minRent: 140000, maxRent: 220000 },
      { type: 'Villas', unitTypes: '3BR → 5BR', minBudget: 3000000, maxBudget: 6000000, minRent: 180000, maxRent: 350000 },
    ],
  },
  {
    name: 'Al Furjan',
    value: 'Al Furjan',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 650000, maxBudget: 2200000, minRent: 50000, maxRent: 130000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 2700000, maxBudget: 4500000, minRent: 170000, maxRent: 280000 },
      { type: 'Villas', unitTypes: '4BR → 6BR', minBudget: 4500000, maxBudget: 9000000, minRent: 250000, maxRent: 450000 },
    ],
  },
  {
    name: 'Discovery Gardens',
    value: 'Discovery Gardens',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 2BR', minBudget: 480000, maxBudget: 1300000, minRent: 35000, maxRent: 80000 },
    ],
    notes: 'Most buildings are older Nakheel developments with large layouts.',
  },
  {
    name: 'Dubai Production City',
    value: 'Dubai Production City',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 380000, maxBudget: 1800000, minRent: 30000, maxRent: 100000 },
    ],
  },
  {
    name: 'Remraam',
    value: 'Remraam',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 3BR', minBudget: 750000, maxBudget: 1900000, minRent: 50000, maxRent: 110000 },
      { type: 'Townhouses', unitTypes: '2BR → 3BR', minBudget: 1800000, maxBudget: 2800000, minRent: 100000, maxRent: 160000 },
    ],
  },
  {
    name: 'Arabian Ranches',
    value: 'Arabian Ranches',
    products: [
      { type: 'Villas', unitTypes: '3BR → 7BR', minBudget: 4500000, maxBudget: 20000000, minRent: 250000, maxRent: 700000 },
      { type: 'Townhouses', unitTypes: '2BR → 3BR', minBudget: 3500000, maxBudget: 6000000, minRent: 180000, maxRent: 300000 },
    ],
  },
  {
    name: 'Arabian Ranches 2',
    value: 'Arabian Ranches 2',
    products: [
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 3200000, maxBudget: 4800000, minRent: 200000, maxRent: 320000 },
      { type: 'Villas', unitTypes: '4BR → 6BR', minBudget: 5500000, maxBudget: 12000000, minRent: 300000, maxRent: 550000 },
    ],
  },
  {
    name: 'Arabian Ranches 3',
    value: 'Arabian Ranches 3',
    products: [
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 2600000, maxBudget: 4200000, minRent: 170000, maxRent: 280000 },
      { type: 'Villas', unitTypes: '4BR → 5BR', minBudget: 4500000, maxBudget: 8000000, minRent: 280000, maxRent: 450000 },
    ],
    notes: 'Many units are still under construction / recently handed over.',
  },
  {
    name: 'DAMAC Hills',
    value: 'DAMAC Hills',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 650000, maxBudget: 2600000, minRent: 45000, maxRent: 150000 },
      { type: 'Townhouses', unitTypes: '3BR → 5BR', minBudget: 2500000, maxBudget: 5500000, minRent: 170000, maxRent: 350000 },
      { type: 'Villas', unitTypes: '4BR → 7BR+', minBudget: 5000000, maxBudget: 20000000, minRent: 300000, maxRent: 800000 },
    ],
  },
  {
    name: 'DAMAC Hills 2',
    value: 'DAMAC Hills 2',
    products: [
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 1400000, maxBudget: 2400000, minRent: 90000, maxRent: 160000 },
      { type: 'Villas', unitTypes: '3BR → 6BR', minBudget: 2200000, maxBudget: 4500000, minRent: 120000, maxRent: 280000 },
    ],
    notes: 'One of the most affordable townhouse communities in Dubai.',
  },
  {
    name: 'Tilal Al Ghaf',
    value: 'Tilal Al Ghaf',
    products: [
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 3000000, maxBudget: 4500000, minRent: 220000, maxRent: 350000 },
      { type: 'Villas', unitTypes: '4BR → 6BR', minBudget: 7000000, maxBudget: 18000000, minRent: 400000, maxRent: 900000 },
      { type: 'Mansions', unitTypes: '6BR → 8BR+', minBudget: 30000000, maxBudget: 120000000, minRent: 1000000, maxRent: 3000000 },
    ],
  },
  {
    name: 'Mudon',
    value: 'Mudon',
    products: [
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 2700000, maxBudget: 4000000, minRent: 160000, maxRent: 260000 },
      { type: 'Villas', unitTypes: '4BR → 5BR', minBudget: 4500000, maxBudget: 7000000, minRent: 250000, maxRent: 400000 },
    ],
  },
  {
    name: 'Villanova',
    value: 'Villanova',
    products: [
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 2300000, maxBudget: 3600000, minRent: 150000, maxRent: 250000 },
      { type: 'Villas', unitTypes: '4BR → 5BR', minBudget: 3800000, maxBudget: 6000000, minRent: 230000, maxRent: 380000 },
    ],
  },
  {
    name: 'The Villa (Dubailand)',
    value: 'The Villa',
    products: [
      { type: 'Villas', unitTypes: '4BR → 7BR', minBudget: 5000000, maxBudget: 14000000, minRent: 250000, maxRent: 500000 },
    ],
    notes: 'Large Spanish-style villas developed by Dubai Properties.',
  },
  {
    name: 'Emaar Beachfront',
    value: 'Emaar Beachfront',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 4BR', minBudget: 2600000, maxBudget: 12000000, minRent: 140000, maxRent: 600000 },
      { type: 'Penthouses', unitTypes: '4BR → 6BR+', minBudget: 15000000, maxBudget: 80000000, minRent: 500000, maxRent: 2000000 },
    ],
    notes: 'Sea-facing units command 20–35% premiums.',
  },
  {
    name: 'Bluewaters Island',
    value: 'Bluewaters Island',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 4BR', minBudget: 3000000, maxBudget: 13000000, minRent: 160000, maxRent: 700000 },
      { type: 'Penthouses', unitTypes: '4BR → 6BR', minBudget: 18000000, maxBudget: 55000000, minRent: 600000, maxRent: 2000000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 8000000, maxBudget: 16000000, minRent: 400000, maxRent: 700000 },
    ],
    notes: 'Premium units facing Ain Dubai achieve the highest pricing.',
  },
  {
    name: 'Jumeirah Islands',
    value: 'Jumeirah Islands',
    products: [
      { type: 'Villas', unitTypes: '4BR → 6BR', minBudget: 8000000, maxBudget: 25000000, minRent: 350000, maxRent: 800000 },
    ],
    notes: 'Prices vary significantly based on lake frontage and renovations.',
  },
  {
    name: 'Jumeirah Park',
    value: 'Jumeirah Park',
    products: [
      { type: 'Villas', unitTypes: '3BR → 5BR', minBudget: 5000000, maxBudget: 12000000, minRent: 250000, maxRent: 500000 },
    ],
    notes: 'Large plot sizes make this area attractive for European family buyers.',
  },
  {
    name: 'Jumeirah Golf Estates',
    value: 'Jumeirah Golf Estates',
    products: [
      { type: 'Apartments', unitTypes: '1BR → 3BR', minBudget: 1300000, maxBudget: 3000000, minRent: 80000, maxRent: 180000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 3500000, maxBudget: 6000000, minRent: 220000, maxRent: 380000 },
      { type: 'Villas', unitTypes: '4BR → 7BR+', minBudget: 7000000, maxBudget: 40000000, minRent: 400000, maxRent: 1500000 },
    ],
    notes: 'Homes overlooking Earth Course golf course command premium pricing.',
  },
  {
    name: 'Dubai South',
    value: 'Dubai South',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 420000, maxBudget: 1800000, minRent: 30000, maxRent: 100000 },
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 1900000, maxBudget: 3300000, minRent: 120000, maxRent: 200000 },
      { type: 'Villas', unitTypes: '4BR → 5BR', minBudget: 3300000, maxBudget: 6000000, minRent: 180000, maxRent: 320000 },
    ],
  },
  {
    name: 'Dubailand',
    value: 'Dubailand',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 450000, maxBudget: 2000000, minRent: 35000, maxRent: 120000 },
      { type: 'Townhouses', unitTypes: '3BR → 5BR', minBudget: 2000000, maxBudget: 4500000, minRent: 140000, maxRent: 280000 },
      { type: 'Villas', unitTypes: '4BR → 7BR+', minBudget: 4000000, maxBudget: 12000000, minRent: 220000, maxRent: 600000 },
    ],
    notes: 'Includes sub-communities: Villanova, The Villa, Majan, Falcon City, Rukan, Al Habtoor Polo Resort.',
  },
  {
    name: 'Majan',
    value: 'Majan',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 3BR', minBudget: 420000, maxBudget: 1600000, minRent: 32000, maxRent: 95000 },
    ],
  },
  {
    name: 'Falcon City of Wonders',
    value: 'Falcon City of Wonders',
    products: [
      { type: 'Townhouses', unitTypes: '3BR → 4BR', minBudget: 2400000, maxBudget: 3800000, minRent: 150000, maxRent: 250000 },
      { type: 'Villas', unitTypes: '4BR → 7BR', minBudget: 4500000, maxBudget: 9000000, minRent: 220000, maxRent: 450000 },
    ],
  },
  {
    name: 'Rukan',
    value: 'Rukan',
    products: [
      { type: 'Apartments', unitTypes: 'Studio → 2BR', minBudget: 450000, maxBudget: 1200000, minRent: 35000, maxRent: 80000 },
      { type: 'Townhouses', unitTypes: '2BR → 3BR', minBudget: 1300000, maxBudget: 2400000, minRent: 90000, maxRent: 150000 },
    ],
  },
  {
    name: 'Al Habtoor Polo Resort & Club',
    value: 'Al Habtoor Polo Resort',
    products: [
      { type: 'Villas', unitTypes: '3BR → 6BR', minBudget: 5000000, maxBudget: 18000000, minRent: 300000, maxRent: 800000 },
    ],
  },
];

/**
 * Parse a budget string into a number. Handles:
 * - Plain numbers: "2000000", "2,000,000"
 * - Shorthand: "2M", "500K", "1.5m"
 * - Range values from select: "500K-1M", "2M-5M", "10M+"
 */
export function parseBudget(input: string): number {
  if (!input) return 0;

  // Handle range values like "500K-1M", "2M-5M", "10M+"
  const rangeMatch = input.match(/^([\d.]+)([KkMmBb]?)[\s]*[-–][\s]*([\d.]+)([KkMmBb]?)$/);
  if (rangeMatch) {
    const low = parseShorthand(rangeMatch[1], rangeMatch[2]);
    const high = parseShorthand(rangeMatch[3], rangeMatch[4]);
    return (low + high) / 2; // Use midpoint of range
  }

  // Handle "10M+" style
  const plusMatch = input.match(/^([\d.]+)([KkMmBb]?)\+$/);
  if (plusMatch) {
    return parseShorthand(plusMatch[1], plusMatch[2]);
  }

  // Handle "Below 3M" style
  const belowMatch = input.match(/below\s*([\d.]+)([KkMmBb]?)/i);
  if (belowMatch) {
    return parseShorthand(belowMatch[1], belowMatch[2]);
  }

  const cleaned = input.replace(/[^0-9.kmb]/gi, '');
  const lower = cleaned.toLowerCase();

  const mMatch = lower.match(/^([\d.]+)m$/);
  if (mMatch) return parseFloat(mMatch[1]) * 1_000_000;

  const kMatch = lower.match(/^([\d.]+)k$/);
  if (kMatch) return parseFloat(kMatch[1]) * 1_000;

  const bMatch = lower.match(/^([\d.]+)b$/);
  if (bMatch) return parseFloat(bMatch[1]) * 1_000_000_000;

  const num = parseFloat(input.replace(/[^0-9.]/g, ''));
  return isNaN(num) ? 0 : num;
}

function parseShorthand(num: string, suffix: string): number {
  const n = parseFloat(num);
  switch (suffix.toUpperCase()) {
    case 'K': return n * 1_000;
    case 'M': return n * 1_000_000;
    case 'B': return n * 1_000_000_000;
    default: return n;
  }
}

/**
 * Filter locations where at least one product's price range includes the given budget.
 * Returns location options with matching product info in the label.
 */
export function getLocationsByBudget(budget: number): { label: string; value: string; matchingProducts: string[] }[] {
  if (budget <= 0) {
    return LOCATIONS.map(loc => ({
      label: loc.name,
      value: loc.value,
      matchingProducts: loc.products.map(p => PRODUCT_TYPE_MAP[p.type] || p.type),
    }));
  }

  return LOCATIONS
    .map(loc => {
      const matching = loc.products.filter(p => budget >= p.minBudget && budget <= p.maxBudget);
      if (matching.length === 0) return null;
      return {
        label: loc.name,
        value: loc.value,
        matchingProducts: matching.map(p => PRODUCT_TYPE_MAP[p.type] || p.type),
      };
    })
    .filter(Boolean) as { label: string; value: string; matchingProducts: string[] }[];
}

/**
 * Filter locations where at least one product's rent range fits the given annual budget.
 * Shows matching product types and starting rent in suggestions.
 */
export function getLocationsByRentBudget(annualBudget: number): { label: string; value: string; matchingProducts: string[]; startingRent: number }[] {
  if (annualBudget <= 0) {
    return LOCATIONS
      .filter(loc => loc.products.some(p => p.minRent != null))
      .map(loc => {
        const rentProducts = loc.products.filter(p => p.minRent != null);
        const lowestRent = Math.min(...rentProducts.map(p => p.minRent!));
        return {
          label: loc.name,
          value: loc.value,
          matchingProducts: rentProducts.map(p => PRODUCT_TYPE_MAP[p.type] || p.type),
          startingRent: lowestRent,
        };
      });
  }

  return LOCATIONS
    .map(loc => {
      const matching = loc.products.filter(p => p.minRent != null && annualBudget >= p.minRent!);
      if (matching.length === 0) return null;
      const lowestRent = Math.min(...matching.map(p => p.minRent!));
      return {
        label: loc.name,
        value: loc.value,
        matchingProducts: matching.map(p => PRODUCT_TYPE_MAP[p.type] || p.type),
        startingRent: lowestRent,
      };
    })
    .filter(Boolean) as { label: string; value: string; matchingProducts: string[]; startingRent: number }[];
}

/**
 * Get all locations as simple QuestionOption[] (no budget filter).
 */
export function getAllLocationOptions(): { label: string; value: string }[] {
  return LOCATIONS.map(loc => ({ label: loc.name, value: loc.value }));
}

/**
 * Get minimum budget across all locations and products
 */
export function getMinBudgetAcrossLocations(): number {
  let min = Infinity;
  for (const loc of LOCATIONS) {
    for (const p of loc.products) {
      if (p.minBudget < min) min = p.minBudget;
    }
  }
  return min === Infinity ? 0 : min;
}

/**
 * Get maximum budget across all locations and products
 */
export function getMaxBudgetAcrossLocations(): number {
  let max = 0;
  for (const loc of LOCATIONS) {
    for (const p of loc.products) {
      if (p.maxBudget > max) max = p.maxBudget;
    }
  }
  return max;
}

// Map dataset product types to the 4 standard display types
const PRODUCT_TYPE_MAP: Record<string, string> = {
  'Apartments': 'Apartment',
  'Villas': 'Villa',
  'Townhouses': 'Townhouse',
  'Penthouses': 'Penthouse',
  'Mansions': 'Villa', // Mansions mapped to Villa
};

// Canonical order for property types
const PROPERTY_TYPE_ORDER = ['Apartment', 'Villa', 'Townhouse', 'Penthouse'];

/**
 * Get available property types based on budget and optionally area.
 * Returns exactly from: Apartment, Villa, Townhouse, Penthouse + Other
 */
export function getPropertyTypesByBudgetAndArea(
  budget: number,
  area?: string
): { label: string; value: string }[] {
  const types = new Set<string>();

  const locationsToCheck = area
    ? LOCATIONS.filter(loc => loc.value === area)
    : LOCATIONS;

  for (const loc of locationsToCheck) {
    for (const p of loc.products) {
      if (budget <= 0 || (budget >= p.minBudget && budget <= p.maxBudget)) {
        const displayType = PRODUCT_TYPE_MAP[p.type] || p.type;
        types.add(displayType);
      }
    }
  }

  // Sort by canonical order
  const result = PROPERTY_TYPE_ORDER
    .filter(t => types.has(t))
    .map(t => ({ label: t, value: t }));

  // Add "Other" option
  result.push({ label: 'Other', value: 'Other' });
  return result;
}

/**
 * Parse unit types string to get bedroom options.
 * "Studio → 4BR" → ['Studio', '1', '2', '3', '4']
 * "3BR → 6BR+" → ['3', '4', '5', '6+']
 * "4BR → 7BR" → ['4', '5', '6', '7']
 */
function parseUnitTypes(unitTypes: string): string[] {
  const bedrooms: string[] = [];
  
  // Check if Studio is included
  if (unitTypes.toLowerCase().includes('studio')) {
    bedrooms.push('Studio');
  }
  
  // Check if the range has a + suffix (e.g. "7BR+" or "6BR+")
  const hasPlus = /\d+\s*BR\+/.test(unitTypes);
  
  // Extract BR numbers (strip the + for parsing)
  const brMatches = unitTypes.match(/(\d+)\s*BR\+?/gi);
  if (brMatches) {
    const numbers: number[] = [];
    for (const m of brMatches) {
      const n = parseInt(m);
      if (!isNaN(n)) numbers.push(n);
    }
    
    if (numbers.length >= 2) {
      const min = Math.min(...numbers);
      const max = Math.max(...numbers);
      for (let i = min; i < max; i++) {
        bedrooms.push(i.toString());
      }
      // Last number: if original had +, mark it as "X+"
      if (hasPlus) {
        bedrooms.push(`${max}+`);
      } else {
        bedrooms.push(max.toString());
      }
    } else if (numbers.length === 1) {
      if (hasPlus) {
        bedrooms.push(`${numbers[0]}+`);
      } else {
        bedrooms.push(numbers[0].toString());
      }
    }
  }
  
  return bedrooms;
}

/**
 * Get bedroom options based on property type, budget, and area.
 * Uses PRODUCT_TYPE_MAP to match "Apartment" → "Apartments", "Villa" → "Villas"/"Mansions", etc.
 */
export function getBedroomsByTypeAndBudget(
  propertyType: string,
  budget: number,
  area?: string
): { label: string; value: string }[] {
  const bedroomSet = new Set<string>();
  
  // Build reverse map: display type → dataset types
  const datasetTypes: string[] = [];
  for (const [dataKey, displayVal] of Object.entries(PRODUCT_TYPE_MAP)) {
    if (displayVal.toLowerCase() === propertyType.toLowerCase()) {
      datasetTypes.push(dataKey.toLowerCase());
    }
  }
  
  const locationsToCheck = area
    ? LOCATIONS.filter(loc => loc.value === area)
    : LOCATIONS;
    
  for (const loc of locationsToCheck) {
    for (const p of loc.products) {
      if (datasetTypes.includes(p.type.toLowerCase())) {
        if (budget <= 0 || (budget >= p.minBudget && budget <= p.maxBudget)) {
          const brs = parseUnitTypes(p.unitTypes);
          brs.forEach(br => bedroomSet.add(br));
        }
      }
    }
  }
  
  // Convert to sorted array
  const sorted = Array.from(bedroomSet).sort((a, b) => {
    if (a === 'Studio') return -1;
    if (b === 'Studio') return 1;
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    if (isNaN(aNum)) return 1;
    if (isNaN(bNum)) return -1;
    return aNum - bNum;
  });
  
  return sorted.map(br => {
    if (br === 'Studio') return { label: 'Studio', value: 'Studio' };
    if (br.includes('+')) return { label: `${br} Bedrooms`, value: br };
    const n = parseInt(br);
    return { label: `${br} Bedroom${n > 1 ? 's' : ''}`, value: br };
  });
}

/**
 * Format a number with commas (e.g., 1500000 → "1,500,000")
 */
export function formatNumberWithCommas(value: string | number): string {
  const numStr = typeof value === 'number' ? value.toString() : value;
  const cleaned = numStr.replace(/[^\d]/g, '');
  if (!cleaned) return '';
  return parseInt(cleaned).toLocaleString('en-US');
}

/**
 * Validate budget against dataset and return suggestions
 */
export function validateBudget(budget: number): {
  valid: boolean;
  message?: string;
  suggestions?: { label: string; value: string }[];
  minBudget?: number;
} {
  if (budget <= 0) {
    return { valid: false, message: 'Please enter a valid budget amount' };
  }
  
  const minBudget = getMinBudgetAcrossLocations();
  const maxBudget = getMaxBudgetAcrossLocations();
  
  if (budget < minBudget) {
    return {
      valid: false,
      message: `Budget is below the minimum available (AED ${formatNumberWithCommas(minBudget)}). Consider increasing your budget.`,
      minBudget,
    };
  }
  
  const matchingLocations = getLocationsByBudget(budget);
  if (matchingLocations.length === 0) {
    return {
      valid: false,
      message: 'No properties match this budget. Please adjust your budget.',
      minBudget,
    };
  }
  
  if (budget > maxBudget * 2) {
    // Very high budget - suggest luxury locations
    const luxuryLocations = ['Palm Jumeirah', 'Dubai Hills Estate', 'Tilal Al Ghaf', 'Jumeirah Islands', 'Jumeirah Golf Estates'];
    return {
      valid: true,
      message: 'Excellent budget! We recommend these premium locations:',
      suggestions: luxuryLocations.map(l => ({ label: l, value: l })),
    };
  }
  
  return { valid: true };
}

/**
 * Get minimum annual rent across all locations
 */
export function getMinRentAcrossLocations(): number {
  let minRent = Infinity;
  for (const loc of LOCATIONS) {
    for (const p of loc.products) {
      if (p.minRent != null && p.minRent < minRent) {
        minRent = p.minRent;
      }
    }
  }
  return minRent === Infinity ? 0 : minRent;
}

/**
 * Get maximum annual rent across all locations
 */
export function getMaxRentAcrossLocations(): number {
  let maxRent = 0;
  for (const loc of LOCATIONS) {
    for (const p of loc.products) {
      if (p.maxRent != null && p.maxRent > maxRent) {
        maxRent = p.maxRent;
      }
    }
  }
  return maxRent;
}

/**
 * Validate rental budget against dataset and return suggestions
 */
export function validateRentBudget(budget: number): {
  valid: boolean;
  message?: string;
  suggestions?: { label: string; value: string }[];
  minBudget?: number;
} {
  if (budget <= 0) {
    return { valid: false, message: 'Please enter a valid rental budget amount' };
  }

  const minRent = getMinRentAcrossLocations();
  const maxRent = getMaxRentAcrossLocations();

  if (budget < minRent) {
    return {
      valid: false,
      message: `Budget is below the minimum annual rent available (AED ${formatNumberWithCommas(minRent)}). Consider increasing your budget.`,
      minBudget: minRent,
    };
  }

  const matchingLocations = getLocationsByRentBudget(budget);
  if (matchingLocations.length === 0) {
    return {
      valid: false,
      message: 'No rental properties match this budget. Please adjust your budget.',
      minBudget: minRent,
    };
  }

  if (budget > maxRent * 2) {
    const luxuryLocations = ['Palm Jumeirah', 'Downtown Dubai', 'Dubai Hills Estate', 'Bluewaters Island', 'Emirates Hills'];
    return {
      valid: true,
      message: 'Excellent budget! We recommend these premium rental locations:',
      suggestions: luxuryLocations.map(l => ({ label: l, value: l })),
    };
  }

  return { valid: true };
}
