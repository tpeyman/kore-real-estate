import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LeadType, ContactInfo, LeadScore, LuxuryTier } from '@/lib/flowConfig';
import { FLOWS, LEAD_TYPE_OPTIONS, getCurrentQuestion, getProgress, calculateLeadScore } from '@/lib/flowConfig';
import ProgressBar from './ProgressBar';
import StepRenderer from './StepRenderer';
import ContactForm from './ContactForm';
import Summary from './Summary';
import ThankYou from './ThankYou';

type Phase = 'type-select' | 'questions' | 'contact' | 'summary' | 'thank-you';

const LeadForm = () => {
  const [phase, setPhase] = useState<Phase>('type-select');
  const [leadType, setLeadType] = useState<LeadType | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answerOrder, setAnswerOrder] = useState<string[]>([]);
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [score, setScore] = useState<LeadScore>('WARM');
  const [luxuryTier, setLuxuryTier] = useState<LuxuryTier | undefined>();
  const [tags, setTags] = useState<string[]>([]);

  const handleSelectType = useCallback((type: LeadType) => {
    setLeadType(type);
    setAnswers({});
    setAnswerOrder([]);
    setPhase('questions');
  }, []);

  const handleAnswer = useCallback((questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    setAnswerOrder(prev => [...prev, questionId]);

    // Check for luxury redirect
    if (questionId === 'luxury_budget' && value === 'Below 3M') {
      setLeadType('offplan');
      setAnswers({});
      setAnswerOrder([]);
      return;
    }

    // Check if flow is complete
    const flow = FLOWS[leadType!];
    const next = getCurrentQuestion(flow, newAnswers);
    if (!next) {
      setPhase('contact');
    }
  }, [answers, leadType]);

  const handleBack = useCallback(() => {
    if (answerOrder.length === 0) {
      setPhase('type-select');
      return;
    }
    const lastId = answerOrder[answerOrder.length - 1];
    const newAnswers = { ...answers };
    delete newAnswers[lastId];
    setAnswers(newAnswers);
    setAnswerOrder(prev => prev.slice(0, -1));
  }, [answers, answerOrder]);

  const handleContactSubmit = useCallback((info: ContactInfo) => {
    setContact(info);
    const result = calculateLeadScore(leadType!, answers);
    setScore(result.score);
    setLuxuryTier(result.luxuryTier);
    setTags(result.tags);
    setPhase('summary');
  }, [leadType, answers]);

  const handleFinalSubmit = useCallback(() => {
    // In a real app, this would send data to a backend
    console.log('Lead submitted:', { leadType, answers, contact, score, luxuryTier, tags });
    setPhase('thank-you');
  }, [leadType, answers, contact, score, luxuryTier, tags]);

  const rawQuestion = leadType && phase === 'questions' ? getCurrentQuestion(FLOWS[leadType], answers) : null;
  // Resolve dynamic options based on current answers
  const currentQuestion = rawQuestion ? {
    ...rawQuestion,
    options: rawQuestion.dynamicOptions ? rawQuestion.dynamicOptions(answers) : rawQuestion.options,
  } : null;
  const progress = leadType ? getProgress(FLOWS[leadType], answers) : 0;

  // Overall progress including contact + summary phases
  const overallProgress = phase === 'type-select' ? 0
    : phase === 'questions' ? 0.1 + progress * 0.6
    : phase === 'contact' ? 0.75
    : phase === 'summary' ? 0.9
    : 1;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="pt-8 pb-4 px-4 text-center">
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => {
            setPhase('type-select');
            setLeadType(null);
            setAnswers({});
            setAnswerOrder([]);
            setContact(null);
          }}
          className="text-2xl md:text-3xl font-serif cursor-pointer bg-transparent border-none hover:opacity-80 transition-opacity"
        >
          <span className="text-gradient-gold">KORE</span>
          <span className="text-foreground/60 ml-2 text-lg md:text-xl font-sans font-light">Real Estate</span>
        </motion.button>
      </header>

      {/* Progress */}
      {phase !== 'type-select' && phase !== 'thank-you' && (
        <div className="px-4 max-w-2xl mx-auto w-full py-4">
          <ProgressBar progress={overallProgress} />
        </div>
      )}

      {/* Content */}
      <main className="flex-1 flex items-center justify-center py-8">
        <AnimatePresence mode="wait">
          {phase === 'type-select' && (
            <motion.div
              key="type-select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl mx-auto px-4"
            >
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-2 text-center">
                What are you looking to do?
              </h2>
              <p className="text-muted-foreground text-center mb-10 font-sans text-sm">
                Select an option and we'll guide you through
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LEAD_TYPE_OPTIONS.map((option, i) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectType(option.value)}
                    className="group glass-card rounded-2xl p-6 text-left hover:border-primary/50 transition-all duration-300 glow-gold hover:glow-gold"
                  >
                    <span className="text-2xl mb-3 block">{option.icon}</span>
                    <span className="font-serif text-lg text-foreground group-hover:text-primary transition-colors block mb-1">
                      {option.label}
                    </span>
                    <span className="text-muted-foreground font-sans text-xs">
                      {option.description}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'questions' && currentQuestion && (
            <StepRenderer
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
              onBack={handleBack}
              canGoBack
            />
          )}

          {phase === 'contact' && (
            <ContactForm
              key="contact"
              onSubmit={handleContactSubmit}
              onBack={() => setPhase('questions')}
            />
          )}

          {phase === 'summary' && contact && (
            <Summary
              key="summary"
              leadType={leadType!}
              answers={answers}
              contact={contact}
              score={score}
              luxuryTier={luxuryTier}
              onSubmit={handleFinalSubmit}
              onBack={() => setPhase('contact')}
            />
          )}

          {phase === 'thank-you' && (
            <ThankYou key="thank-you" />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-muted-foreground/50 font-sans text-xs">
          © 2026 KORE Real Estate · Dubai, UAE
        </p>
      </footer>
    </div>
  );
};

export default LeadForm;
