import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import LeadForm from '@/components/kore/LeadForm';

const Index = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formPhase, setFormPhase] = useState<string>('type-select');

  return (
    <>
      {/* Trigger button when popup is closed */}
      {!isOpen && (
        <div className="min-h-screen flex items-center justify-center">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-sans text-sm hover:opacity-90 transition-opacity"
          >
            Open Inquiry
          </button>
        </div>
      )}

      {/* Modal overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] rounded-2xl border border-border bg-background shadow-2xl"
            >
              {(formPhase === 'type-select' || formPhase === 'thank-you') && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="sticky top-3 float-right mr-3 mt-3 z-20 p-1.5 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <div className="overflow-y-auto max-h-[90vh]">
                <LeadForm onPhaseChange={setFormPhase} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
