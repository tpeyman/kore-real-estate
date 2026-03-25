import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronRight, Bot, Brain, MessageSquare, Tag, Database, Workflow, Users, Heart, Zap, Building2, Megaphone, Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Section = ({ title, icon, children, defaultOpen = false }: SectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-secondary/50 hover:bg-secondary transition-colors text-left"
      >
        <span className="text-primary">{icon}</span>
        <span className="flex-1 font-semibold text-sm text-foreground">{title}</span>
        {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 text-sm text-muted-foreground leading-relaxed space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'hot' | 'warm' | 'cold' | 'accent'; }) => {
  const classes = {
    default: 'bg-secondary text-secondary-foreground',
    hot: 'bg-red-500/20 text-red-400',
    warm: 'bg-amber-500/20 text-amber-400',
    cold: 'bg-blue-500/20 text-blue-400',
    accent: 'bg-primary/20 text-primary',
  };
  return <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${classes[variant]}`}>{children}</span>;
};

const FlowTable = ({ rows }: { rows: { field: string; type: string; notes?: string }[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs border border-border rounded">
      <thead>
        <tr className="bg-secondary/60">
          <th className="text-left px-3 py-1.5 text-foreground font-semibold">Field</th>
          <th className="text-left px-3 py-1.5 text-foreground font-semibold">Input Type</th>
          <th className="text-left px-3 py-1.5 text-foreground font-semibold">Notes</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t border-border">
            <td className="px-3 py-1.5 text-foreground">{r.field}</td>
            <td className="px-3 py-1.5"><Badge variant="accent">{r.type}</Badge></td>
            <td className="px-3 py-1.5">{r.notes || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface AIAgentLogicPanelProps {
  onClose: () => void;
}

const AIAgentLogicPanel = ({ onClose }: AIAgentLogicPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-4xl max-h-[85vh] rounded-2xl border border-border bg-background shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">AI Agent Logic</h2>
              <p className="text-xs text-muted-foreground">Technical documentation for chat &amp; WhatsApp implementation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-3 pb-6">

            {/* Persona */}
            <Section title="AI Agent Persona" icon={<Users className="h-4 w-4" />} defaultOpen>
              <p>The AI agent operates as an <strong className="text-foreground">experienced Dubai real estate advisor</strong> — professional, confident, friendly, and consultative.</p>
              <ul className="list-disc list-inside space-y-1 ml-1">
                <li>Knowledgeable about the Dubai property market (35 communities, 2025–2026 pricing)</li>
                <li>Guides conversations naturally like a senior property consultant</li>
                <li>Never robotic or scripted — adapts tone to match the user</li>
                <li>Consultative rather than transactional</li>
              </ul>
            </Section>

            {/* Emotional Intelligence */}
            <Section title="Emotional Intelligence" icon={<Heart className="h-4 w-4" />}>
              <p>The AI detects tone and intent, adapting its communication style:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {[
                  { signal: 'User sounds confused', response: 'Provide clarity and guidance' },
                  { signal: 'User is direct/transactional', response: 'Respond efficiently, skip pleasantries' },
                  { signal: 'User appears hesitant', response: 'Provide reassurance and additional info' },
                  { signal: 'User shows strong interest', response: 'Guide toward viewing or consultation' },
                ].map((item, i) => (
                  <div key={i} className="bg-secondary/40 rounded-lg p-2.5">
                    <p className="text-xs text-foreground font-medium">Signal: {item.signal}</p>
                    <p className="text-xs mt-1">→ {item.response}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Intent Detection */}
            <Section title="Intent Detection & Routing" icon={<Brain className="h-4 w-4" />} defaultOpen>
              <p>The AI identifies user intent from 7 service categories derived from the prototype navigation:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {[
                  { emoji: '🏠', label: 'Buy Property', route: 'buyer' },
                  { emoji: '💰', label: 'Sell Property', route: 'seller' },
                  { emoji: '🔑', label: 'Rent Property', route: 'tenant' },
                  { emoji: '📋', label: 'List My Property', route: 'landlord' },
                  { emoji: '📈', label: 'Invest in Off-Plan', route: 'offplan' },
                  { emoji: '💎', label: 'Luxury Investment', route: 'luxury' },
                  { emoji: '💼', label: 'Job at KORE', route: 'job' },
                ].map((item, i) => (
                  <div key={i} className="bg-secondary/40 rounded-lg px-3 py-2 text-center">
                    <p className="text-xs text-foreground font-medium mt-1">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">→ {item.route} flow</p>
                  </div>
                ))}
              </div>
              <p className="mt-2">If no intent is detected, the AI opens with: <em className="text-foreground">"Welcome to Kore Real Estate. How may I assist you today?"</em></p>
            </Section>

            {/* Buy Flow */}
            <Section title="Buy Property" icon={<MessageSquare className="h-4 w-4" />}>
              <p className="mb-2">Goal: Understand buyer requirements and purchasing readiness.</p>
              <FlowTable rows={[
                { field: 'Investment or Personal Use', type: 'Select', notes: 'Investment / End Use' },
                { field: 'Off-Plan or Ready', type: 'Select', notes: 'Routes to payment method if Ready' },
                { field: 'Payment Method', type: 'Select', notes: 'Cash / Mortgage (conditional on Ready)' },
                { field: 'Mortgage Status', type: 'Select', notes: 'Pre-approved / Need Assistance (conditional on Mortgage)' },
                { field: 'Budget', type: 'Budget Input', notes: 'AED. Validates against min ~380K. Filters locations.' },
                { field: 'Preferred Area', type: 'Autocomplete', notes: '35 Dubai communities filtered by budget affordability' },
                { field: 'Property Type', type: 'Select + Other', notes: 'Apartment / Villa / Townhouse / Penthouse, filtered by budget & area' },
                { field: 'Bedrooms', type: 'Select', notes: 'Dynamically filtered by property type (Dubai market rules)' },
                { field: 'Timeline', type: 'Select', notes: 'Immediate / 1 Month / 1–3 Months / Exploring' },
                { field: 'Currently in Dubai', type: 'Select', notes: 'Yes / No' },
              ]} />
            </Section>

            {/* Sell Flow */}
            <Section title="Sell Property" icon={<MessageSquare className="h-4 w-4" />}>
              <p className="mb-2">Goal: Identify property owners interested in selling and assess readiness.</p>
              <FlowTable rows={[
                { field: 'Community', type: 'Autocomplete', notes: '35 Dubai communities' },
                { field: 'Property Type', type: 'Select + Other', notes: 'Filtered by area' },
                { field: 'Bedrooms', type: 'Select', notes: 'Filtered by property type' },
                { field: 'Ready or Off-Plan', type: 'Select', notes: 'Routes to payment status' },
                { field: 'Payment Status', type: 'Select', notes: 'Fully Paid / Mortgage / Payment Plan (conditional)' },
                { field: 'Outstanding Amount', type: 'Budget Input', notes: 'If Mortgage or Payment Plan' },
                { field: 'Occupancy', type: 'Select', notes: 'Vacant / Tenanted' },
                { field: 'Contract Expiry', type: 'Calendar', notes: 'If Tenanted' },
                { field: 'Legal Notice Served', type: 'Select', notes: 'If Tenanted' },
                { field: 'Expected Price', type: 'Budget Input', notes: 'AED' },
                { field: 'Selling Timeline', type: 'Select', notes: 'Standard timeline options' },
                { field: 'Listed with Agency', type: 'Select', notes: 'Yes / No' },
              ]} />
            </Section>

            {/* Rent Flow */}
            <Section title="Rent Property" icon={<MessageSquare className="h-4 w-4" />}>
              <p className="mb-2">Goal: Qualify prospective tenants and match to available inventory.</p>
              <FlowTable rows={[
                { field: 'Annual Rental Budget', type: 'Budget Input', notes: 'AED. Min ~30K. Filters locations & property types.' },
                { field: 'Preferred Area', type: 'Autocomplete', notes: 'Shows starting rent per area' },
                { field: 'Property Type', type: 'Select + Other', notes: 'Filtered by rent budget & area' },
                { field: 'Bedrooms', type: 'Select', notes: 'Filtered by property type + budget + area' },
                { field: 'Move-in Timeline', type: 'Select', notes: 'Standard timeline options' },
                { field: 'Payment Method', type: 'Select', notes: '1 / 2 / 4 Cheques / Other' },
                { field: 'Currently in Dubai', type: 'Select', notes: 'Yes / No' },
                { field: 'Emirates ID', type: 'Select', notes: 'Yes / No / In Process' },
              ]} />
            </Section>

            {/* List My Property Flow */}
            <Section title="List My Property" icon={<MessageSquare className="h-4 w-4" />}>
              <p className="mb-2">Goal: Capture property listings from landlords.</p>
              <FlowTable rows={[
                { field: 'Community', type: 'Autocomplete', notes: '35 Dubai communities' },
                { field: 'Property Type', type: 'Select + Other', notes: 'Filtered by area' },
                { field: 'Bedrooms', type: 'Select', notes: 'Filtered by property type' },
                { field: 'Ready or Off-Plan', type: 'Select', notes: 'Routes to payment status if Off-Plan' },
                { field: 'Occupancy', type: 'Select', notes: 'Vacant / Tenanted' },
                { field: 'Contract Expiry', type: 'Calendar', notes: 'If Tenanted' },
                { field: 'Legal Notice Served', type: 'Select', notes: 'If Tenanted' },
                { field: 'Expected Annual Rent', type: 'Budget Input', notes: 'AED' },
                { field: 'Exclusive Listing', type: 'Select', notes: 'Yes / No' },
                { field: 'Availability Date', type: 'Calendar' },
                { field: 'Professional Marketing', type: 'Select', notes: 'Yes / No' },
              ]} />
            </Section>

            {/* Off-Plan Flow */}
            <Section title="Invest in Off-Plan" icon={<MessageSquare className="h-4 w-4" />}>
              <p className="mb-2">Goal: Qualify investors interested in new developments.</p>
              <FlowTable rows={[
                { field: 'Investment Purpose', type: 'Select', notes: 'Rental / Capital Appreciation / Both / End Use' },
                { field: 'Budget', type: 'Budget Input', notes: 'AED. Filters locations.' },
                { field: 'Preferred Area', type: 'Autocomplete', notes: 'Filtered by budget' },
                { field: 'Property Type', type: 'Select + Other', notes: 'Filtered by budget & area' },
                { field: 'Bedrooms', type: 'Select', notes: 'Filtered by property type' },
                { field: 'Investment Style', type: 'Select', notes: 'Low DP / 1% Plan / Quick Flip / Long-term Hold' },
                { field: 'Timeline', type: 'Select', notes: 'Standard timeline options' },
                { field: 'Down Payment Ready', type: 'Select', notes: 'Yes / No' },
                { field: 'UAE Residency Interest', type: 'Select', notes: 'Yes / No / Not Sure' },
              ]} />
            </Section>

            {/* Luxury Flow */}
            <Section title="Luxury Investment" icon={<MessageSquare className="h-4 w-4" />}>
              <p className="mb-2">Goal: Identify high-value buyers. Budget below 3M redirects to Off-Plan flow.</p>
              <FlowTable rows={[
                { field: 'Investment Range', type: 'Select', notes: '3M–5M / 5M–10M / 10M+ / Below 3M AED' },
                { field: 'Objective', type: 'Select', notes: 'Rental / Appreciation / Lifestyle / Portfolio (hidden if Below 3M)' },
                { field: 'Prime Location', type: 'Autocomplete', notes: 'Luxury locations filtered by budget' },
                { field: 'Property Type', type: 'Select + Other', notes: 'Filtered by budget & area' },
                { field: 'Bedrooms', type: 'Select', notes: 'Filtered by property type' },
                { field: 'Down Payment Ready', type: 'Select', notes: 'Yes / No' },
                { field: 'Payment Structure', type: 'Select', notes: 'Full Cash / Post-Handover / Developer Plan / Flexible' },
                { field: 'Timeline', type: 'Select', notes: 'Standard timeline options' },
                { field: 'Residency/Structuring', type: 'Select', notes: 'Yes / No / Not Sure' },
              ]} />
              <div className="mt-2 p-2.5 bg-secondary/40 rounded-lg">
                <p className="text-xs font-semibold text-foreground mb-1">Luxury Tier Classification:</p>
                <ul className="text-xs space-y-1">
                  <li><Badge variant="hot">Tier A</Badge> — 5M+ AED, funds ready, immediate → Private Client Team</li>
                  <li><Badge variant="warm">Tier B</Badge> — High budget or funds ready</li>
                  <li><Badge variant="cold">Tier C</Badge> — Exploring / not yet committed</li>
                </ul>
              </div>
            </Section>

            {/* Job Flow */}
            <Section title="Job at KORE" icon={<MessageSquare className="h-4 w-4" />}>
              <p className="mb-2">Goal: Capture recruitment inquiries with CV upload.</p>
              <FlowTable rows={[
                { field: 'Full Name', type: 'Text' },
                { field: 'Phone Number', type: 'Phone Input', notes: 'International format' },
                { field: 'Email', type: 'Email Input' },
                { field: 'CV Upload', type: 'File Upload', notes: 'PDF / DOC / DOCX' },
              ]} />
            </Section>

            {/* Lead Scoring */}
            <Section title="Lead Qualification & Scoring" icon={<Zap className="h-4 w-4" />}>
              <p>Every lead is automatically scored as <Badge variant="hot">HOT</Badge>, <Badge variant="warm">WARM</Badge>, or <Badge variant="cold">COLD</Badge> based on collected data:</p>
              <div className="space-y-3 mt-3">
                <div className="bg-secondary/40 rounded-lg p-3">
                  <p className="text-xs font-semibold text-foreground">Buyer / Off-Plan Scoring</p>
                  <ul className="text-xs mt-1 space-y-0.5">
                    <li><Badge variant="hot">HOT</Badge> — Budget ≥ 2M AED + Immediate timeline</li>
                    <li><Badge variant="warm">WARM</Badge> — High budget OR (immediate + funds ready)</li>
                    <li><Badge variant="cold">COLD</Badge> — Otherwise</li>
                  </ul>
                </div>
                <div className="bg-secondary/40 rounded-lg p-3">
                  <p className="text-xs font-semibold text-foreground">Seller Scoring</p>
                  <ul className="text-xs mt-1 space-y-0.5">
                    <li><Badge variant="hot">HOT</Badge> — Vacant + Fully Paid + Immediate</li>
                    <li><Badge variant="warm">WARM</Badge> — Vacant OR Fully Paid</li>
                    <li><Badge variant="cold">COLD</Badge> — Otherwise</li>
                  </ul>
                </div>
                <div className="bg-secondary/40 rounded-lg p-3">
                  <p className="text-xs font-semibold text-foreground">Tenant Scoring</p>
                  <ul className="text-xs mt-1 space-y-0.5">
                    <li><Badge variant="hot">HOT</Badge> — Immediate + Emirates ID + 1–2 Cheques</li>
                    <li><Badge variant="warm">WARM</Badge> — Immediate OR Emirates ID</li>
                    <li><Badge variant="cold">COLD</Badge> — Otherwise</li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* Tagging */}
            <Section title="Automatic Tagging" icon={<Tag className="h-4 w-4" />}>
              <p>Tags are auto-applied based on conversation data for CRM compatibility:</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['buyer', 'seller', 'tenant', 'landlord', 'offplan', 'luxury', 'high-budget', 'immediate', 'funds-ready', 'private-client-team', 'redirect-offplan', 'job-applicant', 'campaign-lead', 'retargeted', 'property-matched'].map((tag) => (
                  <Badge key={tag} variant="accent">{tag}</Badge>
                ))}
              </div>
              <p className="mt-2">Tags are structured as string arrays in the lead result object, directly compatible with CRM tagging systems.</p>
            </Section>

            {/* Data Storage */}
            <Section title="Chat Transcript Storage" icon={<Database className="h-4 w-4" />}>
              <p>Each conversation stores a structured lead result:</p>
              <FlowTable rows={[
                { field: 'conversation_id', type: 'UUID', notes: 'Unique per session' },
                { field: 'timestamp', type: 'ISO 8601', notes: 'Auto-generated' },
                { field: 'lead_type', type: 'Enum', notes: 'buyer / seller / tenant / landlord / offplan / luxury' },
                { field: 'lead_name', type: 'String', notes: 'From contact form (fullName)' },
                { field: 'phone_number', type: 'String', notes: 'International format' },
                { field: 'email', type: 'String', notes: 'OTP-verified email' },
                { field: 'nationality', type: 'String', notes: 'From contact form' },
                { field: 'preferred_language', type: 'String', notes: 'From contact form' },
                { field: 'answers', type: 'JSON', notes: 'All flow answers as key-value pairs' },
                { field: 'lead_score', type: 'Enum', notes: 'HOT / WARM / COLD' },
                { field: 'luxury_tier', type: 'Enum?', notes: 'A / B / C (luxury flow only)' },
                { field: 'tags', type: 'String[]', notes: 'Auto-generated tags array' },
                { field: 'source_channel', type: 'Enum', notes: 'website_chat / whatsapp / meta_ads / google_ads' },
                { field: 'utm_source', type: 'String?', notes: 'Campaign source if applicable' },
                { field: 'utm_campaign', type: 'String?', notes: 'Campaign name if applicable' },
                { field: 'matched_properties', type: 'JSON?', notes: 'Array of property IDs suggested during conversation' },
                { field: 'conversation_transcript', type: 'JSON', notes: 'Full Q&A history' },
              ]} />
            </Section>

            {/* Automation */}
            <Section title="Automation Flow" icon={<Workflow className="h-4 w-4" />}>
              <p>End-to-end automation pipeline:</p>
              <div className="mt-2 space-y-2">
                {[
                  { step: '1', label: 'Conversation begins', desc: 'User selects intent or AI detects it from message' },
                  { step: '2', label: 'AI qualification conversation', desc: 'Collects data through natural dialogue matching flow steps' },
                  { step: '3', label: 'Property / Off-Plan matching', desc: 'AI queries listings database and suggests matching properties in real time' },
                  { step: '4', label: 'Lead scoring', desc: 'Auto-calculates HOT / WARM / COLD + luxury tier' },
                  { step: '5', label: 'Contact verification', desc: 'OTP email verification + phone number capture' },
                  { step: '6', label: 'Data sent to n8n automation', desc: 'Structured LeadResult object via webhook' },
                  { step: '7', label: 'CRM contact created/updated', desc: 'Tags applied, lead score attached, matched properties logged' },
                  { step: '8', label: 'Sales team notified', desc: 'HOT leads prioritized, Luxury Tier A → Private Client Team' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">{item.step}</div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{item.label}</p>
                      <p className="text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Property & Off-Plan Awareness — NEW */}
            <Section title="Property & Off-Plan Awareness" icon={<Building2 className="h-4 w-4" />}>
              <p>The AI agent has <strong className="text-foreground">real-time access</strong> to the website's property listings database and off-plan projects database, enabling contextual property suggestions during conversation.</p>

              <div className="mt-3 space-y-3">
                <div className="bg-secondary/40 rounded-lg p-3">
                  <p className="text-xs font-semibold text-foreground mb-1.5">🏠 Active Listings Matching</p>
                  <p className="text-xs">When a user provides requirements, the AI queries the listings API to find matching properties:</p>
                  <ul className="list-disc list-inside text-xs mt-1.5 space-y-0.5">
                    <li>Filters by <strong className="text-foreground">property type</strong> (Apartment / Villa / Townhouse / Penthouse)</li>
                    <li>Filters by <strong className="text-foreground">preferred area</strong> from 35 Dubai communities</li>
                    <li>Filters by <strong className="text-foreground">budget range</strong> (purchase price or annual rent)</li>
                    <li>Filters by <strong className="text-foreground">bedrooms</strong> using Dubai market rules</li>
                    <li>Returns top 3–5 matching listings with key details (price, size, developer, availability)</li>
                  </ul>
                </div>

                <div className="bg-secondary/40 rounded-lg p-3">
                  <p className="text-xs font-semibold text-foreground mb-1.5">📈 Off-Plan Project Suggestions</p>
                  <p className="text-xs">For off-plan and luxury investors, the AI queries the projects database:</p>
                  <ul className="list-disc list-inside text-xs mt-1.5 space-y-0.5">
                    <li>Matches by <strong className="text-foreground">budget range</strong> and investment strategy</li>
                    <li>Filters by <strong className="text-foreground">preferred developers</strong> or locations</li>
                    <li>Includes project details: launch date, expected handover, payment plan structure</li>
                    <li>Highlights potential ROI and rental yield estimates where available</li>
                    <li>Suggests projects aligned with strategy: capital appreciation → emerging areas, rental → high-demand communities</li>
                  </ul>
                </div>

                <div className="bg-secondary/40 rounded-lg p-3">
                  <p className="text-xs font-semibold text-foreground mb-1.5">💬 Conversation Integration</p>
                  <p className="text-xs">The AI presents suggestions naturally, like a professional agent:</p>
                  <div className="mt-2 border-l-2 border-primary/40 pl-3 space-y-2">
                    <p className="text-xs italic text-foreground">"Based on your budget of 1.5M AED in JVC, I found a 2-bedroom apartment at Binghatti Skyrise — currently available at 1.45M with a post-handover payment plan. Would you like more details?"</p>
                    <p className="text-xs italic text-foreground">"There's a new launch by Emaar in Dubai Creek Harbour expected to deliver in Q4 2026, with 1% monthly payment plans starting from 1.2M — this could be a strong fit for your long-term capital appreciation goal."</p>
                  </div>
                </div>

                <FlowTable rows={[
                  { field: 'API Endpoint', type: 'REST / GraphQL', notes: 'Queries listings and off-plan databases' },
                  { field: 'Matching Criteria', type: 'Multi-filter', notes: 'property_type + area + budget + bedrooms' },
                  { field: 'Results Limit', type: 'Integer', notes: '3–5 suggestions per query' },
                  { field: 'Data Returned', type: 'JSON', notes: 'price, size, developer, location, payment_plan, handover_date' },
                  { field: 'Matched Properties Logged', type: 'String[]', notes: 'Property IDs stored in lead transcript for CRM tracking' },
                ]} />
              </div>
            </Section>

            {/* Campaign Context Awareness — NEW */}
            <Section title="Campaign Context Awareness" icon={<Megaphone className="h-4 w-4" />}>
              <p>When leads arrive from <strong className="text-foreground">Meta Ads, Google Ads, or other marketing campaigns</strong>, the AI receives campaign context and tailors the conversation accordingly.</p>

              <div className="mt-3 space-y-3">
                <div className="bg-secondary/40 rounded-lg p-3">
                  <p className="text-xs font-semibold text-foreground mb-1.5">🔗 UTM Parameter Capture</p>
                  <p className="text-xs">The system reads UTM parameters from the landing page URL:</p>
                  <FlowTable rows={[
                    { field: 'utm_source', type: 'String', notes: 'e.g., meta, google, tiktok, email' },
                    { field: 'utm_medium', type: 'String', notes: 'e.g., cpc, social, display, organic' },
                    { field: 'utm_campaign', type: 'String', notes: 'e.g., downtown_dubai_buy_apartments' },
                    { field: 'utm_content', type: 'String', notes: 'e.g., 2br_villa_offer, luxury_penthouse' },
                    { field: 'utm_term', type: 'String', notes: 'e.g., buy apartment dubai marina' },
                  ]} />
                </div>

                <div className="bg-secondary/40 rounded-lg p-3">
                  <p className="text-xs font-semibold text-foreground mb-1.5">🎯 Campaign-Aware Conversation</p>
                  <p className="text-xs">The AI uses campaign context to personalize the opening and flow:</p>
                  <div className="mt-2 space-y-2">
                    {[
                      { campaign: 'downtown_dubai_buy_apartments', opener: '"I see you\'re interested in apartments in Downtown Dubai — are you looking for investment or a primary residence?"' },
                      { campaign: 'palm_jumeirah_luxury_villas', opener: '"Welcome! You\'re exploring luxury villas on Palm Jumeirah — do you have a preferred bedroom count or budget range in mind?"' },
                      { campaign: 'jvc_rent_studios', opener: '"Hi! Looking for a rental in JVC? Let me help find the best options for your budget."' },
                      { campaign: 'offplan_emaar_launch', opener: '"Interested in Emaar\'s latest launch? I can walk you through the payment plans and projected returns."' },
                    ].map((item, i) => (
                      <div key={i} className="border-l-2 border-primary/40 pl-3">
                        <p className="text-[10px] text-muted-foreground font-mono">utm_campaign: {item.campaign}</p>
                        <p className="text-xs italic text-foreground mt-0.5">{item.opener}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-secondary/40 rounded-lg p-3">
                  <p className="text-xs font-semibold text-foreground mb-1.5">📊 Campaign Data in CRM</p>
                  <ul className="list-disc list-inside text-xs space-y-0.5">
                    <li>UTM parameters are stored alongside the lead record</li>
                    <li>Enables attribution tracking: which campaigns generate HOT leads</li>
                    <li>Campaign source is included in the <Badge variant="accent">source_channel</Badge> and tags</li>
                    <li>n8n automation can route leads differently based on campaign origin</li>
                    <li>Retargeting audiences can be built from lead scores + campaign data</li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* Contact Info */}
            <Section title="Contact Information Collection" icon={<Users className="h-4 w-4" />}>
              <p>After flow completion, all leads provide verified contact details:</p>
              <FlowTable rows={[
                { field: 'Full Name', type: 'Text', notes: 'Required' },
                { field: 'Phone', type: 'Phone Input', notes: 'International format with country code' },
                { field: 'Email', type: 'Email + OTP', notes: '6-digit code verification via backend function' },
                { field: 'Nationality', type: 'Autocomplete', notes: 'From country list' },
                { field: 'Preferred Language', type: 'Select', notes: 'English / Arabic / Russian / Chinese / French / Hindi' },
              ]} />
            </Section>

            {/* Property Rules */}
            <Section title="Property Type & Bedroom Rules" icon={<Brain className="h-4 w-4" />}>
              <p>Strictly enforced Dubai market constraints across all flows:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {[
                  { type: 'Apartment', bedrooms: 'Studio, 1BR, 2BR, 3BR, 4BR, 4+' },
                  { type: 'Penthouse', bedrooms: '2BR, 3BR, 4BR, 4+' },
                  { type: 'Villa', bedrooms: '2BR, 3BR, 4BR, 5BR, 6+' },
                  { type: 'Townhouse', bedrooms: '2BR, 3BR, 4BR, 5BR' },
                ].map((item) => (
                  <div key={item.type} className="bg-secondary/40 rounded-lg p-2.5">
                    <p className="text-xs font-semibold text-foreground">{item.type}</p>
                    <p className="text-xs mt-0.5">{item.bedrooms}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2">Invalid combinations (e.g., Studio Villa, 1BR Townhouse) are automatically prevented. Changing property type resets bedroom selection if invalid.</p>
            </Section>

            {/* Location Data */}
            <Section title="Location Dataset (35 Communities)" icon={<Database className="h-4 w-4" />}>
              <p>The system uses a comprehensive dataset of 35 Dubai communities with 2025–2026 market data:</p>
              <ul className="list-disc list-inside space-y-1 ml-1 mt-2">
                <li>Each community contains unit types with min/max purchase prices and annual rent ranges</li>
                <li>Locations are dynamically filtered based on user budget — only showing affordable areas</li>
                <li>Property types within each area are filtered to show only what's available at the user's budget</li>
                <li>Rent flows display starting annual rent per area in the dropdown</li>
                <li>Covers areas including: Downtown Dubai, Dubai Marina, Palm Jumeirah, JVC, Business Bay, DAMAC Hills, and 29 more</li>
              </ul>
            </Section>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIAgentLogicPanel;
