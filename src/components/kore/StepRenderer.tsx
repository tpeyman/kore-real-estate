import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question } from '@/lib/flowConfig';

interface StepRendererProps {
  question: Question;
  onAnswer: (questionId: string, value: string) => void;
  onBack?: () => void;
  canGoBack: boolean;
}

const StepRenderer = ({ question, onAnswer, onBack, canGoBack }: StepRendererProps) => {
  const [textValue, setTextValue] = useState('');

  const handleTextSubmit = () => {
    if (textValue.trim()) {
      onAnswer(question.id, textValue.trim());
      setTextValue('');
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-2xl mx-auto px-4"
      >
        <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-2 text-center">
          {question.text}
        </h2>
        {question.subtitle && (
          <p className="text-muted-foreground text-center mb-8 font-sans text-sm">
            {question.subtitle}
          </p>
        )}
        {!question.subtitle && <div className="mb-8" />}

        {question.type === 'select' && question.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options.map((option, i) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => onAnswer(question.id, option.value)}
                className="group relative px-6 py-4 rounded-xl border border-border bg-card text-card-foreground font-sans text-base
                  hover:border-primary hover:bg-secondary transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-primary/50 text-left"
              >
                <span className="group-hover:text-primary transition-colors">{option.label}</span>
              </motion.button>
            ))}
          </div>
        )}

        {question.type === 'text' && (
          <div className="space-y-4">
            <input
              type="text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
              placeholder="Type your answer..."
              autoFocus
              className="w-full px-6 py-4 rounded-xl border border-border bg-card text-foreground font-sans text-base
                placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                transition-all duration-300"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTextSubmit}
              disabled={!textValue.trim()}
              className="w-full py-4 rounded-xl font-sans font-semibold text-base
                bg-primary text-primary-foreground disabled:opacity-40
                transition-all duration-300"
            >
              Continue
            </motion.button>
          </div>
        )}

        {canGoBack && (
          <div className="mt-8 text-center">
            <button
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors"
            >
              ← Go Back
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default StepRenderer;
