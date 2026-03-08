export type LeadType = 'buyer' | 'seller' | 'tenant' | 'landlord' | 'offplan' | 'luxury';

export type QuestionType = 'select' | 'text' | 'autocomplete' | 'budget' | 'calendar' | 'location-text';

export interface QuestionOption {
  label: string;
  value: string;
  matchingProducts?: string[];
}

export interface Question {
  id: string;
  text: string;
  subtitle?: string;
  type: QuestionType;
  options?: QuestionOption[];
  dynamicOptions?: (answers: Record<string, string>) => QuestionOption[];
  condition?: (answers: Record<string, string>) => boolean;
  hasOther?: boolean; // If true, adds "Other" option that shows text input
  required?: boolean; // Default true for budget/numeric fields
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

const TIMELINE: QuestionOption[] = [
  { label: 'Immediate', value: 'Immediate' },
  { label: 'Within 1 Month', value: '1 Month' },
  { label: '1–3 Months', value: '1-3 Months' },
  { label: 'Just Exploring', value: 'Exploring' },
];

import { 
  getAllLocationOptions, 
  getLocationsByBudget, 
  parseBudget, 
  getPropertyTypesByBudgetAndArea,
} from './locationData';
import { PROPERTY_TYPES_WITH_OTHER } from '@/constants/propertyTypes';
import { getBedroomsForPropertyType, ALL_BEDROOMS } from '@/constants/bedroomOptions';

const FALLBACK_PROPERTY_TYPES: QuestionOption[] = PROPERTY_TYPES_WITH_OTHER.map(o => ({ ...o }));

function getBudgetFilteredLocations(budgetKey: string) {
  return (answers: Record<string, string>): QuestionOption[] => {
    const budgetStr = answers[budgetKey] || '';
    const budget = parseBudget(budgetStr);
    if (budget > 0) {
      const filtered = getLocationsByBudget(budget);
      return filtered.map(loc => ({
        label: loc.label,
        value: loc.value,
        matchingProducts: loc.matchingProducts,
      }));
    }
    return getAllLocationOptions();
  };
}

function getDynamicPropertyTypes(budgetKey: string, areaKey: string) {
  return (answers: Record<string, string>): QuestionOption[] => {
    const budgetStr = answers[budgetKey] || '';
    const budget = parseBudget(budgetStr);
    const area = answers[areaKey] || '';
    const types = getPropertyTypesByBudgetAndArea(budget, area);
    return types.length > 1 ? types : FALLBACK_PROPERTY_TYPES;
  };
}

function getDynamicBedrooms(propertyTypeKey: string) {
  return (answers: Record<string, string>): QuestionOption[] => {
    const propertyType = answers[propertyTypeKey] || '';
    if (!propertyType || propertyType === 'Other') return ALL_BEDROOMS;
    return getBedroomsForPropertyType(propertyType);
  };
}

const DUBAI_AREAS: QuestionOption[] = getAllLocationOptions();

export const FLOWS: Record<LeadType, Question[]> = {
  buyer: [
    { id: 'buyer_purpose', text: 'Is this for investment or personal use?', type: 'select', options: [{ label: 'Investment', value: 'Investment' }, { label: 'End Use (Personal)', value: 'End Use' }] },
    { id: 'buyer_status', text: 'Are you looking for off-plan or ready property?', type: 'select', options: [{ label: 'Off-Plan', value: 'Off-Plan' }, { label: 'Ready Property', value: 'Ready' }] },
    { id: 'buyer_payment', text: 'How will you be paying?', type: 'select', options: [{ label: 'Cash', value: 'Cash' }, { label: 'Mortgage', value: 'Mortgage' }], condition: a => a.buyer_status === 'Ready' },
    { id: 'buyer_mortgage_status', text: 'What is your mortgage status?', type: 'select', options: [{ label: 'Pre-approved', value: 'Pre-approved' }, { label: 'Need Assistance', value: 'Need Assistance' }], condition: a => a.buyer_status === 'Ready' && a.buyer_payment === 'Mortgage' },
    { id: 'buyer_budget', text: 'What is your budget range?', type: 'budget', subtitle: 'Enter your budget in AED', required: true },
    { id: 'buyer_area', text: 'Which area do you prefer?', subtitle: 'Locations filtered based on your budget', type: 'autocomplete', dynamicOptions: getBudgetFilteredLocations('buyer_budget') },
    { id: 'buyer_property_type', text: 'What type of property are you looking for?', type: 'select', hasOther: true, dynamicOptions: getDynamicPropertyTypes('buyer_budget', 'buyer_area') },
    { id: 'buyer_property_type_other', text: 'Please specify the property type', type: 'text', condition: a => a.buyer_property_type === 'Other' },
    { id: 'buyer_bedrooms', text: 'How many bedrooms do you need?', type: 'select', dynamicOptions: getDynamicBedrooms('buyer_property_type'TIMELINE },
    { id: 'buyer_in_dubai', text: 'Are you currently in Dubai?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] },
  ],

  seller: [
    { id: 'seller_community', text: 'Which community is your property in?', type: 'autocomplete', subtitle: 'Select from our communities', dynamicOptions: () => getAllLocationOptions() },
    { id: 'seller_property_type', text: 'What type of property are you selling?', type: 'select', hasOther: true, dynamicOptions: getDynamicPropertyTypes('', 'seller_community') },
    { id: 'seller_property_type_other', text: 'Please specify the property type', type: 'text', condition: a => a.seller_property_type === 'Other' },
    { id: 'seller_bedrooms', text: 'How many bedrooms?', type: 'select', dynamicOptions: getDynamicBedrooms('seller_property_type', '', 'seller_community') },
 , text: 'Is your property readselect', options: [{ label: 'R { label: 'Off-Plan', value: 'Off-Plan' }] },
    { id: 'seller_payment_status', text: 'What is the payment status?', type: 'select', options: [{ label: 'Fully Paid', value: 'Fully Paid' }, { label: 'Mortgage', value: 'Mortgage' }, { label: 'Payment Plan', value: 'Payment Plan' }], condition: a => a.seller_status === 'Ready' },
    { id: 'seller_offplan_payment', text: 'What is the payment status?', type: 'select', options: [{ label: 'Fully Paid', value: 'Fully Paid' }, { label: 'Payment Plan', value: 'Payment Plan' }], condition: a => a.seller_status === 'Off-Plan' },
    { id: 'seller_outstanding', text: 'What is the outstanding amount?', type: 'budget', subtitle: 'Enter amount in AED', condition: a => a.seller_payment_status === 'Mortgage' || a.seller_payment_status === 'Payment Plan' || a.seller_offplan_payment === 'Payment Plan' },
    { id: 'seller_occupancy', text: 'Is the property vacant or tenanted?', type: 'select', options: [{ label: 'Vacant', value: 'Vacant' }, { label: 'Tenanted', value: 'Tenanted' }] },
    { id: 'seller_contract_expiry', text: 'When does the tenancy contract expire?', type: 'calendar', subtitle: 'Select the contract expiry date', condition: a => a.seller_occupancy === 'Tenanted' },
    { id: 'seller_legal_notice', text: 'Has a legal notice been served to the tenant?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }], condition: a => a.seller_occupancy === 'Tenanted' },
    { id: 'seller_price', text: 'What is your expected selling price?', type: 'budget', subtitle: 'Enter amount in AED', required: true },
    { id: 'seller_timeline', text: 'What is your selling timeline?', type: 'select', options: TIMELINE },
    { id: 'seller_listed', text: 'Is your property listed with another agency?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] },
  ],

  tenant: [
    { id: 'tenant_budget', text: 'What is your annual rental budget?', type: 'budget', subtitle: 'Enter your annual budget in AED', required: true },
    { id: 'tenant_area', text: 'Which area do you prefer?', type: 'autocomplete', dynamicOptions: () => getAllLocationOptions() },
    { id: 'tenant_property_type', text: 'What type of property are you looking for?', type: 'select', hasOther: true, dynamicOptions: getDynamicPropertyTypes('', 'tenant_area') },
    { id: 'tenant_property_type_other', text: 'Please specify the property type', type: 'text', condition: a => a.tenant_property_type === 'Other' },
    { id: 'tenant_bedrooms', text: 'How many bedrooms do you need?', type: 'select', dynamicOptions: getDynamicBedrooms('tenant_property_type', '', 'tenant_area') },
    { id: 'tenant_timeline', teed to move in?', type: 'select', options: TIMELINE },cheques', text: 'Preferred payment method?', type: 'select', options: [
      { label: '1 Cheque', value: '1 Cheque' },
      { label: '2 Cheques', value: '2 Cheques' },
      { label: '4 Cheques', value: '4 Cheques' },
      { label: 'Monthly', value: 'Monthly' },
    ]},
    { id: 'tenant_in_dubai', text: 'Are you currently in Dubai?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] },
    { id: 'tenant_eid', text: 'Do you have a valid Emirates ID?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'In Process', value: 'In Process' }] },
  ],

  landlord: [
    { id: 'landlord_community', text: 'Which community is your property in?', type: 'autocomplete', subtitle: 'Select from our communities', dynamicOptions: () => getAllLocationOptions() },
    { id: 'landlord_property_type', text: 'What type of property are you listing?', type: 'select', hasOther: true, dynamicOptions: getDynamicPropertyTypes('', 'landlord_community') },
    { id: 'landlord_property_type_other', text: 'Please specify the property type', type: 'text', condition: a => a.landlord_property_type === 'Other' },
    { id: 'landlord_bedrooms', text: 'How many bedrooms?', type: 'select', dynamicOptions: getDynamicBedrooms('landlord_property_type', '', 'landlord_community') },
    { id: 'landlord_status', text: 'Is youan?', type: 'select', options: [{ label: 'Ready', value: 'Ready' }, { label: 'Off-Plan', value: 'Off-Plan' }] },
    { id: 'landlord_offplan_payment', text: 'What is the payment status?', type: 'select', options: [{ label: 'Fully Paid', value: 'Fully Paid' }, { label: 'Payment Plan', value: 'Payment Plan' }], condition: a => a.landlord_status === 'Off-Plan' },
    { id: 'landlord_occupancy', text: 'Is the property vacant or tenanted?', type: 'select', options: [{ label: 'Vacant', value: 'Vacant' }, { label: 'Tenanted', value: 'Tenanted' }] },
    { id: 'landlord_contract_expiry', text: 'When does the tenancy contract expire?', type: 'calendar', subtitle: 'Select the contract expiry date', condition: a => a.landlord_occupancy === 'Tenanted' },
    { id: 'landlord_legal_notice', text: 'Has a legal notice been served?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }], condition: a => a.landlord_occupancy === 'Tenanted' },
    { id: 'landlord_rent', text: 'What is your expected annual rent?', type: 'budget', subtitle: 'Enter amount in AED', required: true },
    { id: 'landlord_exclusive', text: 'Are you open to an exclusive listing?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] },
    { id: 'landlord_availability', text: 'When is the property available?', type: 'calendar', subtitle: 'Select the availability date' },
    { id: 'landlord_marketing', text: 'Are you open to professional marketing?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] },
  ],

  offplan: [
    { id: 'offplan_purpose', text: 'What is your investment purpose?', type: 'select', options: [
      { label: 'Rental Income', value: 'Rental' },
      { label: 'Capital Appreciation', value: 'Appreciation' },
      { label: 'Both', value: 'Both' },
      { label: 'End Use', value: 'End Use' },
    ]},
    { id: 'offplan_budget', text: 'What is your investment budget?', type: 'budget', subtitle: 'Enter your budget in AED', required: true },
    { id: 'offplan_area', text: 'Preferred area?', subtitle: 'Locations filtered based on your budget', type: 'autocomplete', dynamicOptions: getBudgetFilteredLocations('offplan_budget') },
    { id: 'offplan_property_type', text: 'What type of property?', type: 'select', hasOther: true, dynamicOptions: getDynamicPropertyTypes('offplan_budget', 'offplan_area') },
    { id: 'offplan_property_type_other', text: 'Please specify the property type', type: 'text', condition: a => a.offplan_property_type === 'Other' },
    { id: 'offplan_bedrooms', text: 'How many bedrooms?', type: 'select', dynamicOptions: getDynamicBedrooms('offplan_property_type', 'offplan_budget', 'offplan_area') },
    { id: 'offplan_style', text: 'What is your investment style?', type: 'select', options: [
      { label: 'Low Down Payment', value: 'Low DP' },
      { label: '1% Monthly Plan', value: '1% Plan' },
      { label: 'Quick Flip', value: 'Flip' },
      { label: 'Long-term Hold', value: 'Hold' },
    ]},
    { id: 'offplan_timeline', text: 'What is your timeline?', type: 'select', options: TIMELINE },
    { id: 'offplan_dp_ready', text: 'Is your down payment ready?', type: 'select', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] },
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
    { id: 'luxury_location', text: 'Preferred prime location?', type: 'autocomplete', condition: a => a.luxury_budget !== 'Below 3M', dynamicOptions: (answers) => {
      const budget = parseBudget(answers.luxury_budget || '');
      if (budget >= 3000000) {
        return getLocationsByBudget(budget).map(loc => ({
          label: loc.label,
          value: loc.value,
          matchingProducts: loc.matchingProducts,
        }));
      }
      return getAllLocationOptions();
    }},
    { id: 'luxury_property_type', text: 'What type of property are you looking for?', type: 'select', hasOther: true, condition: a => a.luxury_budget !== 'Below 3M', dynamicOptions: getDynamicPropertyTypes('luxury_budget', 'luxury_location') },
    { id: 'luxury_property_type_other', text: 'Please specify the property type', type: 'text', condition: a => a.luxury_budget !== 'Below 3M' && a.luxury_property_type === 'Other' },
    { id: 'luxury_bedrooms', text: 'How many bedrooms?', type: 'select', condition: a => a.luxury_budget !== 'Below 3M', dynamicOptions: getDynamicBedrooms('luxury_property_type', 'luxury_budget', 'luxury_location') },
    { id: 'luxury_dp_ready', text: 'Is your down payment ready?', type: 'select', condition: a => a.luxury_budget !== 'Below 3M', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] },
    { id: 'luxury_payment_pref', text: 'Preferred payment structure?', type: 'select', condition: a => a.luxury_budget !== 'Below 3M', options: [
      { label: 'Full Cash', value: 'Cash' },
      { label: 'Post-Handover Plan', value: 'Post-Handover' },
      { label: 'Developer Plan', value: 'Developer Plan' },
      { label: 'Flexible', value: 'Flexible' },
    ]},
    { id: 'luxury_timeline', text: 'What is your timeline?', type: 'select', condition: a => a.luxury_budget !== 'Below 3M', options: TIMELINE },
    { id: 'luxury_residency', text: 'Interested in residency or structuring?', type: 'select', condition: a => a.luxury_budget !== 'Below 3M', options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Not Sure', value: 'Not Sure' }] },
  ],
};

// Lead scoring
export function calculateLeadScore(leadType: LeadType, answers: Record<string, string>): { score: LeadScore; luxuryTier?: LuxuryTier; tags: string[] } {
  const tags: string[] = [leadType];
  let score: LeadScore = 'WARM';
  let luxuryTier: LuxuryTier | undefined;

  switch (leadType) {
    case 'buyer': {
      const budgetNum = parseBudget(answers.buyer_budget || '');
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
      const budgetNum = parseBudget(answers.offplan_budget || '');
      const highBudget = budgetNum >= 2000000;
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

// Language options - includes Farsi
export const LANGUAGE_OPTIONS = [
  { label: 'English', value: 'English' },
  { label: 'Arabic', value: 'Arabic' },
  { label: 'Farsi', value: 'Farsi' },
  { label: 'Hindi', value: 'Hindi' },
  { label: 'Urdu', value: 'Urdu' },
  { label: 'Russian', value: 'Russian' },
  { label: 'Chinese', value: 'Chinese' },
  { label: 'French', value: 'French' },
  { label: 'Other', value: 'Other' },
];
