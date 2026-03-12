import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const OTP_API_BASE = 'https://koredxb.app.n8n.cloud/webhook';

const ERROR_MESSAGES: Record<string, string> = {
  wrong_code: 'Incorrect code. Please Try Again.',
  expired: 'Code expired. Please request a new one.',
  not_found: 'Session not found. Please request a new code.',
  already_used: 'Code already used. Please request a new one.',
};

interface OtpVerificationProps {
  contactValue: string;
  method: 'email' | 'phone';
  sessionId: string;
  phone: string;
  email: string;
  leadType: string;
  onVerified: () => void;
  onBack: () => void;
  onResend: () => void;
}

const OtpVerification = ({ contactValue, method, sessionId, phone, email, leadType, onVerified, onBack, onResend }: OtpVerificationProps) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

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
      const res = await fetch(`${OTP_API_BASE}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, code }),
      });
      const data = await res.json();
      if (data?.valid) {
        onVerified();
      } else {
        setError(ERROR_MESSAGES[data?.reason] || 'Invalid code. Please try again.');
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

  const handleResend = async () => {
    setResending(true);
    setError('');
    try {
      onResend();
    } finally {
      setResending(false);
    }
  };

  const label = method === 'email' ? 'email' : 'phone number';
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
        Verify Your {method === 'email' ? 'Email' : 'Phone'}
      </h2>
      <p className="text-muted-foreground font-sans text-sm mb-2">
        Enter the 6-digit code sent to your {label}
      </p>
      <p className="text-foreground font-medium font-sans text-sm mb-8">
        {contactValue}
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
          onClick={handleResend}
          disabled={resending || loading}
          className="text-primary hover:text-primary/80 font-sans text-sm transition-colors disabled:opacity-40"
        >
          {resending ? 'Resending...' : 'Resend Code'}
        </button>
        <br />
        <button
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors"
        >
          ← Go back
        </button>
      </div>
    </motion.div>
  );
};

export default OtpVerification;
