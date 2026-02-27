import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ContactInfo } from '@/lib/flowConfig';

interface ContactFormProps {
  onSubmit: (info: ContactInfo) => void;
  onBack: () => void;
  onRequestOtp: (email: string) => void;
  emailVerified?: boolean;
}

const ContactForm = ({ onSubmit, onBack, onRequestOtp, emailVerified: externalVerified = false }: ContactFormProps) => {
  const [form, setForm] = useState<ContactInfo>({
    fullName: '',
    phone: '',
    email: '',
    nationality: '',
    preferredLanguage: ''
  });
  const emailVerified = externalVerified;

  const update = (field: keyof ContactInfo, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = form.fullName && form.phone && form.email && emailVerified;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onSubmit(form);
  };

  const handleVerifyEmail = () => {
    if (form.email) {
      onRequestOtp(form.email);
    }
  };

  // Called from parent after OTP verification succeeds
  // Parent will set emailVerified via a callback

  const inputClass = "w-full px-5 py-3.5 rounded-xl border border-border bg-card text-foreground font-sans text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto px-4">

      <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-2 text-center">
        Almost There
      </h2>
      <p className="text-muted-foreground text-center mb-8 font-sans text-sm">
        Share your details so our team can reach you
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Full Name *" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className={inputClass} required />
        <input type="tel" placeholder="Phone Number *" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} required />
        
        <div className="relative">
          <input type="email" placeholder="Email Address *" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} required />
          {form.email && !emailVerified && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleVerifyEmail}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-sans font-semibold hover:bg-primary/90 transition-colors"
            >
              Verify
            </motion.button>
          )}
          {emailVerified && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-sans font-semibold text-primary flex items-center gap-1"
            >
              ✓ Verified
            </motion.span>
          )}
        </div>
        
        <select value={form.preferredLanguage} onChange={(e) => update('preferredLanguage', e.target.value)} className={inputClass}>
          <option value="">Preferred Language</option>
          <option value="English">English</option>
          <option value="Arabic">Arabic</option>
          <option value="Hindi">Hindi</option>
          <option value="Urdu">Urdu</option>
          <option value="Russian">Russian</option>
          <option value="Chinese">Chinese</option>
          <option value="French">French</option>
          <option value="Other">Other</option>
        </select>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!isValid}
          className="w-full py-4 rounded-xl font-sans font-semibold text-base
            bg-primary text-primary-foreground disabled:opacity-40 transition-all duration-300 mt-2">
          Review Summary
        </motion.button>

        {!emailVerified && form.email && (
          <p className="text-muted-foreground text-center text-xs font-sans">
            Please verify your email to continue
          </p>
        )}
      </form>

      <div className="mt-6 text-center">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors">
          ← Go Back
        </button>
      </div>
    </motion.div>
  );
};

export default ContactForm;
export type { ContactFormProps };
