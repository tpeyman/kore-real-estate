import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface OtpVerificationProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

const OtpVerification = ({ email, onVerified, onBack }: OtpVerificationProps) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Send OTP on mount
  useEffect(() => {
    sendOtp();
  }, []);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const sendOtp = async () => {
    setSending(true);
    setError('');
    try {
      const { data, error: fnError } = await supabase.functions.invoke('send-otp', {
        body: { email },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setSent(true);
      setCooldown(60);
    } catch (err: any) {
      setError('Failed to send code. Please try again.');
      console.error('Send OTP error:', err);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    // Auto-focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all filled
    const fullCode = newOtp.join('');
    if (fullCode.length === 6) {
      verifyOtp(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 0) return;
    const newOtp = Array(6).fill('');
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    if (pasted.length === 6) {
      verifyOtp(pasted);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  const verifyOtp = async (code: string) => {
    setLoading(true);
    setError('');
    try {
      const { data, error: fnError } = await supabase.functions.invoke('verify-otp', {
        body: { email, code },
      });
      if (fnError) throw fnError;
      if (data?.verified) {
        onVerified();
      } else {
        setError(data?.error || 'Invalid code. Please try again.');
        setOtp(Array(6).fill(''));
        inputRefs.current[0]?.focus();
      }
    } catch (err: any) {
      setError('Verification failed. Please try again.');
      console.error('Verify OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-12 h-14 text-center text-xl font-mono rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto px-4 text-center"
    >
      <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-2">
        Verify Your Email
      </h2>
      <p className="text-muted-foreground font-sans text-sm mb-8">
        We sent a 6-digit code to{' '}
        <span className="text-foreground font-medium">{email}</span>
      </p>

      <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={inputClass}
            disabled={loading}
            autoFocus={i === 0}
          />
        ))}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-destructive font-sans text-sm mb-4"
        >
          {error}
        </motion.p>
      )}

      {loading && (
        <p className="text-muted-foreground font-sans text-sm mb-4">Verifying...</p>
      )}

      <div className="mt-6 space-y-3">
        <button
          onClick={sendOtp}
          disabled={sending || cooldown > 0}
          className="text-primary hover:text-primary/80 font-sans text-sm transition-colors disabled:opacity-40"
        >
          {sending
            ? 'Sending...'
            : cooldown > 0
            ? `Resend code in ${cooldown}s`
            : 'Resend code'}
        </button>

        <div>
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors"
          >
            ← Change email
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OtpVerification;
