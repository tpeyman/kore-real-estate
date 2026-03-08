import { useState } from 'react';
import { motion } from 'framer-motion';
import PhoneInputField from './PhoneInputField';
import type { ContactInfo } from '@/lib/flowConfig';
import { LANGUAGE_OPTIONS } from '@/lib/flowConfig';

type VerifyMethod = 'email' | 'phone' | null;

interface ContactFormProps {
  onSubmit: (info: ContactInfo) => void;
  onBack: () => void;
  onRequestOtp: (value: string, method: VerifyMethod, contactInfo: ContactInfo) => void;
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
  const [showMethodPicker, setShowMethodPicker] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const update = (field: keyof ContactInfo, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const hasRequired = !!(form.fullName && form.phone && form.email && phoneValid);

  const handleReviewClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasRequired) return;

    if (externalVerified) {
      onSubmit(form);
    } else {
      setShowMethodPicker(true);
    }
  };

  const handleMethodSelect = (method: 'email' | 'phone') => {
    const value = method === 'email' ? form.email : form.phone;
    setShowMethodPicker(false);
    onRequestOtp(value, method, form);
  };

  // If returned from OTP verified, submit directly
  if (externalVerified && hasRequired) {
    // Auto-submit on next render when verified
  }

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

      <form onSubmit={handleReviewClick} className="space-y-4">
        <input type="text" placeholder="Full Name *" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className={inputClass} required />
        <div>
          <PhoneInputField
            value={form.phone}
            onChange={(phone, isValid) => {
              update('phone', phone);
              setPhoneValid(isValid);
              setPhoneError(phone && !isValid ? 'Please enter a valid phone number' : '');
            }}
            className={inputClass}
            defaultCountry="ae"
          />
          {phoneError && (
            <p className="text-destructive font-sans text-xs mt-1.5 ml-1">{phoneError}</p>
          )}
        </div>
        <input type="email" placeholder="Email Address *" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} required />

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
          disabled={!hasRequired}
          className="w-full py-4 rounded-xl font-sans font-semibold text-base
            bg-primary text-primary-foreground disabled:opacity-40 transition-all duration-300 mt-2">
          Review Summary
        </motion.button>
      </form>

      {/* Verification method picker overlay */}
      {showMethodPicker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMethodPicker(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl"
          >
            <h3 className="text-xl font-serif text-foreground text-center mb-2">Verify Your Identity</h3>
            <p className="text-muted-foreground text-center text-sm font-sans mb-6">
              Choose how you'd like to verify
            </p>
            <div className="space-y-3">
              <button
                onClick={() => handleMethodSelect('phone')}
                className="w-full py-3.5 rounded-xl border border-border bg-secondary text-secondary-foreground font-sans text-sm hover:border-primary/50 hover:bg-secondary/80 transition-all"
              >
                Verify via Phone — {form.phone}
              </button>
              <button
                onClick={() => handleMethodSelect('email')}
                className="w-full py-3.5 rounded-xl border border-border bg-secondary text-secondary-foreground font-sans text-sm hover:border-primary/50 hover:bg-secondary/80 transition-all"
              >
                Verify via Email — {form.email}
              </button>
            </div>
            <button
              onClick={() => setShowMethodPicker(false)}
              className="mt-4 w-full text-center text-muted-foreground hover:text-foreground font-sans text-xs transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}

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
