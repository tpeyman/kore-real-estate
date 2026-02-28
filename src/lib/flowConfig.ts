export type LeadType = 'buyer' | 'seller' | 'tenant' | 'landlord' | 'offplan' | 'luxury';

export type QuestionType = 'select' | 'text';

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  text: string;
  subtitle?: string;
  type: QuestionType;
  options?: QuestionOption[];
  dynamicOptions?: (answers: Record<string, string>) => QuestionOption[];
  condition?: (answers: Record<string, string>) => boolean;
}

export interface ContactInfo {
  fullName: string;
  phone: string;
  email: string;
  nationality: string;
  preferredLanguage: string;
}

export type LeadScore = 'HOT' | 'WARM' | 'COLD';
export type LuxuryTier = 'A' | 'B' | 'C';

export interface LeadResult {
  leadType: LeadType;
  answers: Record<string, string>;
  contact: ContactInfo;
  score: LeadScore;
  luxuryTier?: LuxuryTier;
  tags: string[];
}

export const LEAD_TYPE_OPTIONS: { label: string; value: LeadType | 'job'; icon: string; description: string }[] = [
  { label: 'Buy Property', value: 'buyer', icon: '🏠', description: 'Find your dream home or investment' },
  { label: 'Sell Property', value: 'seller', icon: '💰', description: 'Get the best value for your property' },
  { label: 'Rent Property', value: 'tenant', icon: '🔑', description: 'Find your perfect rental' },
  { label: 'List My Property', value: 'landlord', icon: '📋', description: 'List your property for rent' },
  { label: 'Invest in Off-Plan', value: 'offplan', icon: '📈', description: 'Smart off-plan investments' },
  { label: 'Luxury Investment', value: 'luxury', icon: '💎', description: 'Premium properties 3M+ AED' },
  { label: 'Job at KORE', value: 'job', icon: '💼', description: 'Join our team of professionals' },
];

const PROPERTY_TYPES: QuestionOption[] = [
  { label: 'Apartment', value: 'Apartment' },
  { label: 'Villa', value: 'Villa' },
  { label: 'Townhouse', value: 'Townhouse' },
];

const BEDROOMS_APARTMENT: QuestionOption[] = [
  { label: 'Studio', value: 'Studio' },
  { label: '1 Bedroom', value: '1' },
  { label: '2 Bedrooms', value: '2' },
  { label: '3 Bedrooms', value: '3' },
  { label: '4+ Bedrooms', value: '4+' },
];

const BEDROOMS_TOWNHOUSE: QuestionOption[] = [
  { label: '2 Bedrooms', value: '2' },
  { label: '3 Bedrooms', value: '3' },
  { label: '4+ Bedrooms', value: '4+' },
];

const BEDROOMS_VILLA: QuestionOption[] = [
  { label: '2 Bedrooms', value: '2' },
  { label: '3 Bedrooms', value: '3' },
  { label: '4 Bedrooms', value: '4' },
  { label: '5+ Bedrooms', value: '5+' },
];

const BEDROOMS_VILLA_PALM: QuestionOption[] = [
  { label: '3 Bedrooms', value: '3' },
  { label: '4 Bedrooms', value: '4' },
  { label: '5+ Bedrooms', value: '5+' },
];

function getBedroomsByPropertyType(propertyTypeKey: string, areaKey?: string) {
  return (answers: Record<string, string>): QuestionOption[] => {
    const pt = answers[propertyTypeKey];
    const area = areaKey ? answers[areaKey] : '';
    if (pt === 'Villa' || pt === 'Ultra Villa') {
      return area === 'Palm Jumeirah' ? BEDROOMS_VILLA_PALM : BEDROOMS_VILLA;
    }
    if (pt === 'Townhouse') return BEDROOMS_TOWNHOUSE;
    return BEDROOMS_APARTMENT;
  };
}

const TIMELINE: QuestionOption[] = [
  { label: 'Immediate', value: 'Immediate' },
  { label: 'Within 1 Month', value: '1 Month' },
  { label: '1–3 Months', value: '1-3 Months' },
  { label: 'Just Exploring', value: 'Exploring' },
];

const DUBAI_AREAS: QuestionOption[] = [
  { label: 'Downtown Dubai', value: 'Downtown Dubai' },
  { label: 'Dubai Marina', value: 'Dubai Marina' },
  { label: 'Palm Jumeirah', value: 'Palm Jumeirah' },
  { label: 'Business Bay', value: 'Business Bay' },
  { label: 'Dubai Hills Estate', value: 'Dubai Hills Estate' },
  { label: 'JBR', value: 'JBR' },
  { label: 'Arabian Ranches', value: 'Arabian Ranches' },
  { label: 'DIFC', value: 'DIFC' },
  { label: 'JVC', value: 'JVC' },
  { label: 'Dubai Creek Harbour', value: 'Dubai Creek Harbour' },
  { label: 'MBR City', value: 'MBR City' },
  { label: 'Emaar Beachfront', value: 'Emaar Beachfront' },
  { label: 'Town Square', value: 'Town Square' },
  { label: 'Damac Lagoons', value: 'Damac Lagoons' },
  { label: 'Dubai Production City', value: 'Dubai Production City' },
  { label: 'Other', value: 'Other' },
];

const BUYER_BUDGET: QuestionOption[] = [
  { label: 'Under 500K AED', value: 'Under 500K' },
  { label: '500K – 1M AED', value: '500K-1M' },
  { label: '1M – 2M AED', value: '1M-2M' },
  { label: '2M – 5M AED', value: '2M-5M' },
  { label: '5M – 10M AED', value: '5M-10M' },
  { label: '10M+ AED', value: '10M+' },
];

export const FLOWS: Record<LeadType, Question[]> = {
  buyer: [
    { id: 'buyer_purpose', text: 'Is this for investment or personal use?', type: 'select', options: [{ label: 'Investment', value: 'Investment' }, { label: 'End Use (Personal)', value: 'End Use' }] },
    { id: 'buyer_status', text: 'Are you looking for off-plan or ready property?', type: 'select', options: [{ label: 'Off-Plan', value: 'Off-Plan' }, { label: 'Ready Property', value: 'Ready' }] },
    { id: 'buyer_payment', text: 'How will you be paying?', type: 'select', options: [{ label: 'Cash', value: 'Cash' }, { label: 'Mortgage', value: 'Mortgage' }], condition: a => a.buyer_status === 'Ready' },
    { id: 'buyer_mortgage_status', text: 'What is your mortgage status?', type: 'select', options: [{ label: 'Pre-approved', value: 'Pre-approved' }, { label: 'Need Assistance', value: 'Need Assistance' }], condition: a => a.buyer_status === 'Ready' && a.buyer_payment === 'Mortgage' },
    { id: 'buyer_area', text: 'Which area do you prefer?', type: 'select', options: DUBAI_AREAS },
    { id: 'buyer_property_type', text: 'What type of property are you looking for?', type: 'select', options: PROPERTY_TYPES },
    { id: 'buyer_bedrooms', text: 'How many bedrooms do you need?', type: 'select', dynamicOptions: getBedroomsByPropertyType('buyer_property_type', 'buyer_area') },
    { id: 'buyer_budget', text: 'What is your budget range?', type: 'text', subtitle: 'Enter your budget in AED (e.g. 2,000,000)' },
    { id: 'buyer_timeline', text: 'What is your timeline?', type: 'select', options: TIMELINE },
    { id: 'buyer_in_dubai', text: 'Are you currently in Dubai?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] },
  ],

  seller: [
    { id: 'seller_property_type', text: 'What type of property are you selling?', type: 'select', options: PROPERTY_TYPES },
    { id: 'seller_status', text: 'Is your property ready or off-plan?', type: 'select', options: [{ label: 'Ready', value: 'Ready' }, { label: 'Off-Plan', value: 'Off-Plan' }] },
    { id: 'seller_payment_status', text: 'What is the payment status?', type: 'select', options: [{ label: 'Fully Paid', value: 'Fully Paid' }, { label: 'Mortgage', value: 'Mortgage' }, { label: 'Payment Plan', value: 'Payment Plan' }], condition: a => a.seller_status === 'Ready' },
    { id: 'seller_offplan_payment', text: 'What is the payment status?', type: 'select', options: [{ label: 'Fully Paid', value: 'Fully Paid' }, { label: 'Payment Plan', value: 'Payment Plan' }], condition: a => a.seller_status === 'Off-Plan' },
    { id: 'seller_outstanding', text: 'What is the outstanding amount?', type: 'text', subtitle: 'Enter amount in AED', condition: a => a.seller_payment_status === 'Mortgage' || a.seller_payment_status === 'Payment Plan' || a.seller_offplan_payment === 'Payment Plan' },
    { id: 'seller_community', text: 'Which community is your property in?', type: 'text', subtitle: 'e.g. Dubai Marina, Downtown Dubai' },
    { id: 'seller_occupancy', text: 'Is the property vacant or tenanted?', type: 'select', options: [{ label: 'Vacant', value: 'Vacant' }, { label: 'Tenanted', value: 'Tenanted' }] },
    { id: 'seller_contract_expiry', text: 'When does the tenancy contract expire?', type: 'text', subtitle: 'e.g. March 2025', condition: a => a.seller_occupancy === 'Tenanted' },
    { id: 'seller_legal_notice', text: 'Has a legal notice been served to the tenant?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }], condition: a => a.seller_occupancy === 'Tenanted' },
    { id: 'seller_price', text: 'What is your expected selling price?', type: 'text', subtitle: 'Enter amount in AED' },
    { id: 'seller_timeline', text: 'What is your selling timeline?', type: 'select', options: TIMELINE },
    { id: 'seller_listed', text: 'Is your property listed with another agency?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] },
  ],

  tenant: [
    { id: 'tenant_area', text: 'Which area do you prefer?', type: 'select', options: DUBAI_AREAS },
    { id: 'tenant_property_type', text: 'What type of property are you looking for?', type: 'select', options: PROPERTY_TYPES },
    { id: 'tenant_bedrooms', text: 'How many bedrooms do you need?', type: 'select', dynamicOptions: getBedroomsByPropertyType('tenant_property_type', 'tenant_area') },
    { id: 'tenant_budget', text: 'What is your annual rental budget?', type: 'text', subtitle: 'Enter your annual budget in AED (e.g. 80,000)' },
    { id: 'tenant_timeline', text: 'When do you need to move in?', type: 'select', options: TIMELINE },
    { id: 'tenant_cheques', text: 'Preferred payment method?', type: 'select', options: [
      { label: '1 Cheque', value: '1 Cheque' },
      { label: '2 Cheques', value: '2 Cheques' },
      { label: '4 Cheques', value: '4 Cheques' },
      { label: 'Monthly', value: 'Monthly' },
    ]},
    { id: 'tenant_in_dubai', text: 'Are you currently in Dubai?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] },
    { id: 'tenant_eid', text: 'Do you have a valid Emirates ID?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'In Process', value: 'In Process' }] },
  ],

  landlord: [
    { id: 'landlord_property_type', text: 'What type of property are you listing?', type: 'select', options: PROPERTY_TYPES },
    { id: 'landlord_status', text: 'Is your property ready or off-plan?', type: 'select', options: [{ label: 'Ready', value: 'Ready' }, { label: 'Off-Plan', value: 'Off-Plan' }] },
    { id: 'landlord_offplan_payment', text: 'What is the payment status?', type: 'select', options: [{ label: 'Fully Paid', value: 'Fully Paid' }, { label: 'Payment Plan', value: 'Payment Plan' }], condition: a => a.landlord_status === 'Off-Plan' },
    { id: 'landlord_community', text: 'Which community is your property in?', type: 'text', subtitle: 'e.g. Dubai Marina, Downtown Dubai' },
    { id: 'landlord_occupancy', text: 'Is the property vacant or tenanted?', type: 'select', options: [{ label: 'Vacant', value: 'Vacant' }, { label: 'Tenanted', value: 'Tenanted' }] },
    { id: 'landlord_contract_expiry', text: 'When does the tenancy contract expire?', type: 'text', subtitle: 'e.g. March 2025', condition: a => a.landlord_occupancy === 'Tenanted' },
    { id: 'landlord_legal_notice', text: 'Has a legal notice been served?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }], condition: a => a.landlord_occupancy === 'Tenanted' },
    { id: 'landlord_rent', text: 'What is your expected annual rent?', type: 'text', subtitle: 'Enter amount in AED' },
    { id: 'landlord_exclusive', text: 'Are you open to an exclusive listing?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] },
    { id: 'landlord_availability', text: 'When is the property available?', type: 'text', subtitle: 'e.g. Immediately, March 2025' },
    { id: 'landlord_marketing', text: 'Are you open to professional marketing?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] },
  ],

  offplan: [
    { id: 'offplan_purpose', text: 'What is your investment purpose?', type: 'select', options: [
      { label: 'Rental Income', value: 'Rental' },
      { label: 'Capital Appreciation', value: 'Appreciation' },
      { label: 'Both', value: 'Both' },
      { label: 'End Use', value: 'End Use' },
    ]},
    { id: 'offplan_budget', text: 'What is your investment budget?', type: 'select', options: [
      { label: '500K – 1M AED', value: '500K-1M' },
      { label: '1M – 2M AED', value: '1M-2M' },
      { label: '2M – 5M AED', value: '2M-5M' },
      { label: '5M – 10M AED', value: '5M-10M' },
      { label: '10M+ AED', value: '10M+' },
    ]},
    { id: 'offplan_area', text: 'Preferred area?', type: 'select', options: DUBAI_AREAS },
    { id: 'offplan_property_type', text: 'What type of property?', type: 'select', options: PROPERTY_TYPES },
    { id: 'offplan_bedrooms', text: 'How many bedrooms?', type: 'select', dynamicOptions: getBedroomsByPropertyType('offplan_property_type', 'offplan_area') },
    { id: 'offplan_style', text: 'What is your investment style?', type: 'select', options: [
      { label: 'Low Down Payment', value: 'Low DP' },
      { label: '1% Monthly Plan', value: '1% Plan' },
      { label: 'Quick Flip', value: 'Flip' },
      { label: 'Long-term Hold', value: 'Hold' },
    ]},
    { id: 'offplan_timeline', text: 'What is your timeline?', type: 'select', options: TIMELINE },
    { id: 'offplan_dp_ready', text: 'Is your down payment ready?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] },
    { id: 'offplan_residency', text: 'Are you interested in UAE residency?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Not Sure', value: 'Not Sure' }] },
    { id: 'offplan_residency', text: 'Are you interested in UAE residency?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Not Sure', value: 'Not Sure' }] },
  ],

  luxury: [
    { id: 'luxury_budget', text: 'What is your investment range?', type: 'select', subtitle: 'Luxury investments start at 3M AED', options: [
      { label: '3M – 5M AED', value: '3M-5M' },
      { label: '5M – 10M AED', value: '5M-10M' },
      { label: '10M+ AED', value: '10M+' },
      { label: 'Below 3M AED', value: 'Below 3M' },
    ]},
    { id: 'luxury_objective', text: 'What is your investment objective?', type: 'select', condition: a => a.luxury_budget !== 'Below 3M', options: [
      { label: 'Rental Income', value: 'Rental' },
      { label: 'Capital Appreciation', value: 'Appreciation' },
      { label: 'Lifestyle / End Use', value: 'Lifestyle' },
      { label: 'Portfolio Diversification', value: 'Portfolio' },
    ]},
    { id: 'luxury_asset_type', text: 'What type of asset are you looking for?', type: 'select', condition: a => a.luxury_budget !== 'Below 3M', options: [
      { label: 'Branded Residences', value: 'Branded' },
      { label: 'Golf Community', value: 'Golf' },
      { label: 'Waterfront / Beachfront', value: 'Waterfront' },
      { label: 'Ultra Luxury Villa', value: 'Ultra Villa' },
    ]},
    { id: 'luxury_bedrooms', text: 'How many bedrooms?', type: 'select', condition: a => a.luxury_budget !== 'Below 3M', dynamicOptions: getBedroomsByPropertyType('luxury_asset_type') },
    { id: 'luxury_dp_ready', text: 'Is your down payment ready?', type: 'select', condition: a => a.luxury_budget !== 'Below 3M', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] },
    { id: 'luxury_payment_pref', text: 'Preferred payment structure?', type: 'select', condition: a => a.luxury_budget !== 'Below 3M', options: [
      { label: 'Full Cash', value: 'Cash' },
      { label: 'Post-Handover Plan', value: 'Post-Handover' },
      { label: 'Developer Plan', value: 'Developer Plan' },
      { label: 'Flexible', value: 'Flexible' },
    ]},
    { id: 'luxury_timeline', text: 'What is your timeline?', type: 'select', condition: a => a.luxury_budget !== 'Below 3M', options: TIMELINE },
    { id: 'luxury_residency', text: 'Interested in residency or structuring?', type: 'select', condition: a => a.luxury_budget !== 'Below 3M', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Not Sure', value: 'Not Sure' }] },
    { id: 'luxury_location', text: 'Preferred prime location?', type: 'select', condition: a => a.luxury_budget !== 'Below 3M', options: [
      { label: 'Palm Jumeirah', value: 'Palm Jumeirah' },
      { label: 'Emirates Hills', value: 'Emirates Hills' },
      { label: 'Dubai Hills', value: 'Dubai Hills' },
      { label: 'District One', value: 'District One' },
      { label: 'Jumeirah Bay Island', value: 'Jumeirah Bay Island' },
      { label: 'Other', value: 'Other' },
    ]},
  ],
};

// Lead scoring
export function calculateLeadScore(leadType: LeadType, answers: Record<string, string>): { score: LeadScore; luxuryTier?: LuxuryTier; tags: string[] } {
  const tags: string[] = [leadType];
  let score: LeadScore = 'WARM';
  let luxuryTier: LuxuryTier | undefined;

  switch (leadType) {
    case 'buyer': {
      const budgetNum = parseFloat(answers.buyer_budget?.replace(/[^0-9.]/g, '') || '0');
      const highBudget = budgetNum >= 2000000;
      const immediate = answers.buyer_timeline === 'Immediate';
      const cashOrApproved = answers.buyer_payment === 'Cash' || answers.buyer_mortgage_status === 'Pre-approved';
      if (highBudget && immediate) score = 'HOT';
      else if (highBudget || (immediate && cashOrApproved)) score = 'WARM';
      else score = 'COLD';
      if (highBudget) tags.push('high-budget');
      if (immediate) tags.push('immediate');
      if (cashOrApproved) tags.push('funds-ready');
      break;
    }
    case 'seller': {
      const vacant = answers.seller_occupancy === 'Vacant';
      const fullyPaid = answers.seller_payment_status === 'Fully Paid' || answers.seller_offplan_payment === 'Fully Paid';
      const immediate = answers.seller_timeline === 'Immediate';
      if (vacant && fullyPaid && immediate) score = 'HOT';
      else if (vacant || fullyPaid) score = 'WARM';
      else score = 'COLD';
      break;
    }
    case 'tenant': {
      const immediate = answers.tenant_timeline === 'Immediate';
      const hasEID = answers.tenant_eid === 'Yes';
      const goodCheques = ['1 Cheque', '2 Cheques'].includes(answers.tenant_cheques);
      if (immediate && hasEID && goodCheques) score = 'HOT';
      else if (immediate || hasEID) score = 'WARM';
      else score = 'COLD';
      break;
    }
    case 'landlord':
      score = 'WARM';
      break;
    case 'offplan': {
      const highBudget = ['2M-5M', '5M-10M', '10M+'].includes(answers.offplan_budget);
      const fundsReady = answers.offplan_dp_ready === 'Yes';
      const immediate = answers.offplan_timeline === 'Immediate';
      if (highBudget && fundsReady && immediate) score = 'HOT';
      else if (highBudget || fundsReady) score = 'WARM';
      else score = 'COLD';
      break;
    }
    case 'luxury': {
      if (answers.luxury_budget === 'Below 3M') {
        score = 'COLD';
        tags.push('redirect-offplan');
        break;
      }
      const highBudget = ['5M-10M', '10M+'].includes(answers.luxury_budget);
      const fundsReady = answers.luxury_dp_ready === 'Yes';
      const immediate = answers.luxury_timeline === 'Immediate';
      if (highBudget && fundsReady && immediate) {
        score = 'HOT';
        luxuryTier = 'A';
        tags.push('private-client-team');
      } else if (highBudget || fundsReady) {
        score = 'WARM';
        luxuryTier = 'B';
      } else {
        score = 'COLD';
        luxuryTier = 'C';
      }
      break;
    }
  }

  tags.push(score);
  return { score, luxuryTier, tags };
}

export function getActiveQuestions(flow: Question[], answers: Record<string, string>): Question[] {
  return flow.filter(q => !q.condition || q.condition(answers));
}

export function getCurrentQuestion(flow: Question[], answers: Record<string, string>): Question | null {
  const active = getActiveQuestions(flow, answers);
  return active.find(q => !(q.id in answers)) || null;
}

export function getProgress(flow: Question[], answers: Record<string, string>): number {
  const active = getActiveQuestions(flow, answers);
  const answered = active.filter(q => q.id in answers).length;
  return active.length > 0 ? answered / active.length : 0;
}

export function getLeadTypeLabel(type: LeadType): string {
  return LEAD_TYPE_OPTIONS.find(o => o.value === type)?.label || type;
}
