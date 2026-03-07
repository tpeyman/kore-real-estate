import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question } from '@/lib/flowConfig';

interface StepRendererProps {
  question: Question;
  answers?: Record<string, string>;
  onAnswer: (questionId: string, value: string) => void;
  onBack?: () => void;
  canGoBack: boolean;
}

const StepRenderer = ({ question, answers = {}, onAnswer, onBack, canGoBack }: StepRendererProps) => {
  const [textValue, setTextValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Resolve options: dynamicOptions (with answers) take priority over static options
  const resolvedOptions = useMemo(() => {
    if (question.type !== 'autocomplete') return [];
    if (question.dynamicOptions) return question.dynamicOptions(answers);
    return question.options || [];
  }, [question, answers]);

  const filteredOptions = useMemo(() => {
    if (question.type !== 'autocomplete') return [];
    if (!textValue.trim()) return resolvedOptions;
    const lower = textValue.toLowerCase();
    return resolvedOptions.filter(o => o.label.toLowerCase().includes(lower));
  }, [question.type, resolvedOptions, textValue]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredOptions]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll('[data-option]');
    items[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex]);

  const handleTextSubmit = () => {
    if (textValue.trim()) {
      onAnswer(question.id, textValue.trim());
      setTextValue('');
    }
  };

  const handleAutocompleteSelect = (value: string) => {
    setTextValue('');
    setIsOpen(false);
    onAnswer(question.id, value);
  };

  const handleAutocompleteKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredOptions.length === 0) {
      if (e.key === 'ArrowDown') setIsOpen(true);
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(i => Math.min(i + 1, filteredOptions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        handleAutocompleteSelect(filteredOptions[highlightedIndex].value);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
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

        {question.type === 'autocomplete' && question.options && (
          <div className="relative space-y-2">
            <input
              ref={inputRef}
              type="text"
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 150)}
              onKeyDown={handleAutocompleteKeyDown}
              placeholder="Start typing a location..."
              autoFocus
              className="w-full px-6 py-4 rounded-xl border border-border bg-card text-foreground font-sans text-base
                placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                transition-all duration-300"
            />
            {isOpen && filteredOptions.length > 0 && (
              <div
                ref={listRef}
                className="absolute z-50 w-full max-h-64 overflow-y-auto rounded-xl border border-border bg-card shadow-lg"
              >
                {filteredOptions.map((option, i) => (
                  <button
                    key={option.value}
                    data-option
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleAutocompleteSelect(option.value)}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    className={`w-full px-6 py-3 text-left font-sans text-sm transition-colors
                      ${i === highlightedIndex ? 'bg-secondary text-primary' : 'text-foreground hover:bg-secondary/50'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
            {isOpen && textValue.trim() && filteredOptions.length === 0 && (
              <div className="absolute z-50 w-full rounded-xl border border-border bg-card shadow-lg px-6 py-4 text-center">
                <p className="text-muted-foreground font-sans text-sm">No matching locations found</p>
              </div>
            )}
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
