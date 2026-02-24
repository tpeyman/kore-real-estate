import { motion } from 'framer-motion';
import type { LeadType, ContactInfo, LeadScore, LuxuryTier } from '@/lib/flowConfig';
import { FLOWS, getActiveQuestions, getLeadTypeLabel } from '@/lib/flowConfig';

interface SummaryProps {
  leadType: LeadType;
  answers: Record<string, string>;
  contact: ContactInfo;
  score: LeadScore;
  luxuryTier?: LuxuryTier;
  onSubmit: () => void;
  onBack: () => void;
}

const Summary = ({ leadType, answers, contact, score, luxuryTier, onSubmit, onBack }: SummaryProps) => {
  const flow = FLOWS[leadType];
  const activeQuestions = getActiveQuestions(flow, answers);

  const scoreColors: Record<LeadScore, string> = {
    HOT: 'bg-red-500/20 text-red-400 border-red-500/30',
    WARM: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    COLD: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto px-4"
    >
      <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-2 text-center">
        Review Your Details
      </h2>
      <p className="text-muted-foreground text-center mb-6 font-sans text-sm">
        Please confirm everything looks correct
      </p>

      <div className="glass-card rounded-2xl p-6 space-y-5">
        {/* Lead type + score */}
        <div className="flex items-center justify-between">
          <span className="text-primary font-sans font-semibold text-sm uppercase tracking-wider">
            {getLeadTypeLabel(leadType)}
          </span>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-sans font-semibold border ${scoreColors[score]}`}>
              {score}
            </span>
            {luxuryTier && (
              <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold border border-primary/30 bg-primary/10 text-primary">
                Tier {luxuryTier}
              </span>
            )}
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Answers */}
        <div className="space-y-3">
          {activeQuestions.filter(q => answers[q.id]).map(q => (
            <div key={q.id} className="flex justify-between items-start gap-4">
              <span className="text-muted-foreground font-sans text-sm flex-shrink-0">{q.text.replace('?', '')}</span>
              <span className="text-foreground font-sans text-sm font-medium text-right">{answers[q.id]}</span>
            </div>
          ))}
        </div>

        <div className="h-px bg-border" />

        {/* Contact */}
        <div className="space-y-2">
          <span className="text-primary font-sans font-semibold text-xs uppercase tracking-wider">Contact</span>
          <div className="grid grid-cols-2 gap-2 text-sm font-sans">
            <span className="text-muted-foreground">Name</span>
            <span className="text-foreground text-right">{contact.fullName}</span>
            <span className="text-muted-foreground">Phone</span>
            <span className="text-foreground text-right">{contact.phone}</span>
            <span className="text-muted-foreground">Email</span>
            <span className="text-foreground text-right truncate">{contact.email}</span>
            {contact.nationality && <>
              <span className="text-muted-foreground">Nationality</span>
              <span className="text-foreground text-right">{contact.nationality}</span>
            </>}
            {contact.preferredLanguage && <>
              <span className="text-muted-foreground">Language</span>
              <span className="text-foreground text-right">{contact.preferredLanguage}</span>
            </>}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSubmit}
        className="w-full py-4 rounded-xl font-sans font-semibold text-base mt-6
          bg-primary text-primary-foreground transition-all duration-300"
      >
        Submit
      </motion.button>

      <div className="mt-4 text-center">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors">
          ← Go Back
        </button>
      </div>
    </motion.div>
  );
};

export default Summary;
