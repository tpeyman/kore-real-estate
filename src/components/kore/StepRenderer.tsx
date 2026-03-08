import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import type { Question } from '@/lib/flowConfig';
import { formatNumberWithCommas, validateBudget, validateRentBudget, parseBudget, getMinBudgetAcrossLocations } from '@/lib/locationData';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

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
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [validationSuggestions, setValidationSuggestions] = useState<{ label: string; value: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Resolve options: dynamicOptions (with answers) take priority over static options
  const resolvedOptions = useMemo(() => {
    if (question.type !== 'autocomplete' && question.type !== 'select') return [];
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

  // Format budget input with commas
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const formatted = formatNumberWithCommas(raw);
    setTextValue(formatted);
  };

  const handleBudgetSubmit = () => {
    const cleanedValue = textValue.replace(/,/g, '');
    const budget = parseBudget(cleanedValue);
    
    if (!cleanedValue.trim() || budget <= 0) {
      setValidationMessage('Please enter a valid budget amount');
      setShowValidationPopup(true);
      return;
    }
    
    const validation = validateBudget(budget);
    
    if (!validation.valid) {
      setValidationMessage(validation.message || 'Invalid budget');
      if (validation.minBudget) {
        setValidationSuggestions([
          { label: `Use minimum: AED ${formatNumberWithCommas(validation.minBudget)}`, value: validation.minBudget.toString() }
        ]);
      }
      setShowValidationPopup(true);
      return;
    }
    
    if (validation.suggestions && validation.suggestions.length > 0) {
      setValidationMessage(validation.message || '');
      setValidationSuggestions(validation.suggestions);
      setShowValidationPopup(true);
      // Still allow proceeding with current value
    }
    
    onAnswer(question.id, cleanedValue);
    setTextValue('');
  };

  const handleTextSubmit = () => {
    if (textValue.trim()) {
      onAnswer(question.id, textValue.trim());
      setTextValue('');
    }
  };

  // Text-only validation for location of residence
  const handleLocationTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow letters, spaces, commas, hyphens, periods
    const value = e.target.value.replace(/[^a-zA-Z\s,.\-']/g, '');
    setTextValue(value);
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

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onAnswer(question.id, format(date, 'yyyy-MM-dd'));
    }
  };

  const handlePopupSuggestionClick = (value: string) => {
    setShowValidationPopup(false);
    if (question.type === 'budget') {
      setTextValue(formatNumberWithCommas(value));
    }
  };

  const handlePopupProceed = () => {
    setShowValidationPopup(false);
    const cleanedValue = textValue.replace(/,/g, '');
    onAnswer(question.id, cleanedValue);
    setTextValue('');
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

        {/* Select type */}
        {question.type === 'select' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {resolvedOptions.map((option, i) => (
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

        {/* Autocomplete type */}
        {question.type === 'autocomplete' && (
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
                    <span>{option.label}</span>
                    {option.matchingProducts && option.matchingProducts.length > 0 && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({option.matchingProducts.join(', ')})
                      </span>
                    )}
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

        {/* Budget type with comma formatting and validation */}
        {question.type === 'budget' && (
          <div className="space-y-4">
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground font-sans text-base">AED</span>
              <input
                type="text"
                value={textValue}
                onChange={handleBudgetChange}
                onKeyDown={(e) => e.key === 'Enter' && handleBudgetSubmit()}
                placeholder="0"
                autoFocus
                className="w-full pl-16 pr-6 py-4 rounded-xl border border-border bg-card text-foreground font-sans text-base
                  placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                  transition-all duration-300"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBudgetSubmit}
              disabled={!textValue.trim()}
              className="w-full py-4 rounded-xl font-sans font-semibold text-base
                bg-primary text-primary-foreground disabled:opacity-40
                transition-all duration-300"
            >
              Continue
            </motion.button>
          </div>
        )}

        {/* Calendar type */}
        {question.type === 'calendar' && (
          <div className="space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "w-full px-6 py-4 rounded-xl border border-border bg-card text-left font-sans text-base transition-all duration-300",
                    "hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="inline-block mr-3 h-5 w-5" />
                  {selectedDate ? format(selectedDate, 'PPP') : <span>Select a date</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Location text type - text only, no numbers */}
        {question.type === 'location-text' && (
          <div className="space-y-4">
            <input
              type="text"
              value={textValue}
              onChange={handleLocationTextChange}
              onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
              placeholder="e.g. Dubai, UAE"
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

        {/* Plain text type */}
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

        {/* Validation popup */}
        {showValidationPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowValidationPopup(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl"
            >
              <h3 className="text-lg font-serif text-foreground text-center mb-2">Budget Validation</h3>
              <p className="text-muted-foreground text-center text-sm font-sans mb-4">
                {validationMessage}
              </p>
              {validationSuggestions.length > 0 && (
                <div className="space-y-2 mb-4">
                  {validationSuggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handlePopupSuggestionClick(suggestion.value)}
                      className="w-full py-3 rounded-xl border border-border bg-secondary text-secondary-foreground font-sans text-sm hover:border-primary/50 transition-all"
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowValidationPopup(false)}
                  className="flex-1 py-3 rounded-xl border border-border text-muted-foreground font-sans text-sm hover:text-foreground transition-colors"
                >
                  Go Back
                </button>
                {validationSuggestions.some(s => s.label.includes('recommend')) && (
                  <button
                    onClick={handlePopupProceed}
                    className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-sans text-sm"
                  >
                    Proceed Anyway
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
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
