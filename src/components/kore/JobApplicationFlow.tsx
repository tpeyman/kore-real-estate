import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OtpVerification from './OtpVerification';
import PhoneInputField from './PhoneInputField';
import { LANGUAGE_OPTIONS } from '@/lib/flowConfig';

interface JobData {
  cvFileName: string;
  position: string;
  education: string;
  location: string;
  experience: string;
  drivingLicence: string;
  portfolio: string;
  fullName: string;
  phone: string;
  email: string;
  preferredLanguage: string;
}

type JobStep = 'upload' | 'position' | 'education' | 'location' | 'experience' | 'licence' | 'portfolio' | 'contact' | 'verify-pick' | 'otp' | 'summary';

const STEPS: JobStep[] = ['upload', 'position', 'education', 'location', 'experience', 'licence', 'portfolio', 'contact', 'verify-pick', 'otp', 'summary'];

interface JobApplicationFlowProps {
  onBack: () => void;
  onSubmit: () => void;
  onStepChange?: (step: JobStep) => void;
}

const JobApplicationFlow = ({ onBack, onSubmit, onStepChange }: JobApplicationFlowProps) => {
  const [step, setStep] = useState<JobStep>('upload');
  const [data, setData] = useState<JobData>({
    cvFileName: '',
    position: '',
    education: '',
    location: '',
    experience: '',
    drivingLicence: '',
    portfolio: '',
    fullName: '',
    phone: '',
    email: '',
    preferredLanguage: '',
  });
  const [textValue, setTextValue] = useState('');
  const [verifyMethod, setVerifyMethod] = useState<'email' | 'phone' | null>(null);
  const [pendingValue, setPendingValue] = useState('');
  const [sessionId, setSessionId] = useState('');

  const goTo = useCallback((s: JobStep) => {
    setStep(s);
    onStepChange?.(s);
  }, [onStepChange]);

  const currentIndex = STEPS.indexOf(step);
  // Progress based on the main steps (exclude verify-pick and otp from visual progress)
  const mainSteps = ['upload', 'position', 'education', 'location', 'experience', 'licence', 'portfolio', 'contact', 'summary'];
  const mainIndex = mainSteps.indexOf(step === 'verify-pick' || step === 'otp' ? 'contact' : step);
  const progress = mainIndex / (mainSteps.length - 1);

  const handleBack = () => {
    if (step === 'otp') {
      goTo('verify-pick');
      return;
    }
    if (step === 'verify-pick') {
      goTo('contact');
      return;
    }
    if (currentIndex === 0) {
      onBack();
      return;
    }
    // Find previous step in STEPS, skipping verify-pick and otp
    let prev = currentIndex - 1;
    while (prev >= 0 && (STEPS[prev] === 'verify-pick' || STEPS[prev] === 'otp')) {
      prev--;
    }
    if (prev >= 0) goTo(STEPS[prev]);
    else onBack();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData(prev => ({ ...prev, cvFileName: file.name }));
      goTo('position');
    }
  };

  const handleSelect = (field: keyof JobData, value: string, nextStep: JobStep) => {
    setData(prev => ({ ...prev, [field]: value }));
    goTo(nextStep);
  };

  const handleTextSubmit = (field: keyof JobData, nextStep: JobStep, optional = false) => {
    if (!optional && !textValue.trim()) return;
    setData(prev => ({ ...prev, [field]: textValue.trim() }));
    setTextValue('');
    goTo(nextStep);
  };

  const updateContact = (field: keyof JobData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const [phoneValid, setPhoneValid] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const hasRequiredContact = !!(data.fullName && data.phone && data.email && phoneValid);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasRequiredContact) return;
    goTo('verify-pick');
  };

  const sendOtp = async (method: 'email' | 'phone') => {
    try {
      const res = await fetch('https://koredxb.app.n8n.cloud/webhook/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: data.phone,
          email: data.email,
          method: method === 'phone' ? 'sms' : 'email',
          // method: method === 'phone' ? 'whatsapp' : 'email', // WhatsApp - uncomment when ready
          type: 'job',
        }),
      });
      const result = await res.json();
      if (result?.success) {
        setSessionId(result.sessionId);
      }
    } catch (err) {
      console.error('Failed to send OTP:', err);
    }
  };

  const handleMethodSelect = async (method: 'email' | 'phone') => {
    const value = method === 'email' ? data.email : data.phone;
    setVerifyMethod(method);
    setPendingValue(value);
    await sendOtp(method);
    goTo('otp');
  };

  const handleOtpVerified = () => {
    goTo('summary');
  };

  const selectBtnClass = "group relative px-6 py-4 rounded-xl border border-border bg-card text-card-foreground font-sans text-base hover:border-primary hover:bg-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 text-left";
  const inputClass = "w-full px-6 py-4 rounded-xl border border-border bg-card text-foreground font-sans text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300";
  const continueBtnClass = "w-full py-4 rounded-xl font-sans font-semibold text-base bg-primary text-primary-foreground disabled:opacity-40 transition-all duration-300";

  const showProgressBar = !['summary', 'contact', 'verify-pick', 'otp'].includes(step);
  const showBackButton = !['summary', 'contact', 'verify-pick', 'otp'].includes(step);

  const renderStep = () => {
    switch (step) {
      case 'upload':
        return (
          <StepWrapper key="upload" title="Upload Your CV" subtitle="PDF format preferred">
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary/50 transition-all duration-300">
                {data.cvFileName ? (
                  <div className="space-y-2">
                    <span className="text-3xl block">📄</span>
                    <span className="text-foreground font-sans text-sm font-medium block">{data.cvFileName}</span>
                    <span className="text-muted-foreground font-sans text-xs block">File selected</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <span className="text-3xl block">📁</span>
                    <span className="text-foreground font-sans text-sm block">Click to upload file or drag it here</span>
                    <span className="text-muted-foreground font-sans text-xs block">PDF, DOC, DOCX</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {data.cvFileName && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goTo('position')}
                className={continueBtnClass + ' mt-4'}
              >
                Continue
              </motion.button>
            )}
          </StepWrapper>
        );

      case 'position':
        return (
          <StepWrapper key="position" title="Select Job Position" subtitle="Which role are you applying for?">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Sales and Leasing Manager', 'Property Consultant'].map((pos, i) => (
                <motion.button
                  key={pos}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={() => handleSelect('position', pos, 'education')}
                  className={selectBtnClass}
                >
                  <span className="group-hover:text-primary transition-colors">{pos}</span>
                </motion.button>
              ))}
            </div>
          </StepWrapper>
        );

      case 'education':
        return (
          <StepWrapper key="education" title="Education Level" subtitle="What is your highest level of education?">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['High school diploma', "Bachelor's degree", "Master's degree", 'Others'].map((edu, i) => (
                <motion.button
                  key={edu}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={() => handleSelect('education', edu, 'location')}
                  className={selectBtnClass}
                >
                  <span className="group-hover:text-primary transition-colors">{edu}</span>
                </motion.button>
              ))}
            </div>
          </StepWrapper>
        );

      case 'location':
        // Text-only validation - no numbers allowed
        const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value.replace(/[^a-zA-Z\s,.\-']/g, '');
          setTextValue(value);
        };
        return (
          <StepWrapper key="location" title="Location of Residence" subtitle="Where are you currently based?">
            <div className="space-y-4">
              <input
                type="text"
                value={textValue}
                onChange={handleLocationChange}
                onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit('location', 'experience')}
                placeholder="e.g. Dubai, UAE"
                autoFocus
                className={inputClass}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTextSubmit('location', 'experience')}
                disabled={!textValue.trim()}
                className={continueBtnClass}
              >
                Continue
              </motion.button>
            </div>
          </StepWrapper>
        );

      case 'experience':
        return (
          <StepWrapper key="experience" title="Real Estate Experience" subtitle="Do you have experience in real estate?">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Yes', 'No'].map((val, i) => (
                <motion.button
                  key={val}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={() => handleSelect('experience', val, 'licence')}
                  className={selectBtnClass}
                >
                  <span className="group-hover:text-primary transition-colors">{val}</span>
                </motion.button>
              ))}
            </div>
          </StepWrapper>
        );

      case 'licence':
        return (
          <StepWrapper key="licence" title="Driving Licence" subtitle="Do you have a driving licence?">
            <div className="grid grid-cols-1 gap-3">
              {['Yes (UAE)', 'Yes (international)', 'No'].map((val, i) => (
                <motion.button
                  key={val}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={() => handleSelect('drivingLicence', val, 'portfolio')}
                  className={selectBtnClass}
                >
                  <span className="group-hover:text-primary transition-colors">{val}</span>
                </motion.button>
              ))}
            </div>
          </StepWrapper>
        );

      case 'portfolio':
        return (
          <StepWrapper key="portfolio" title="Portfolio or Social Media" subtitle="Optional — Share a link to your portfolio or relevant professional social media account.">
            <div className="space-y-4">
              <input
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit('portfolio', 'contact', true)}
                placeholder="https://yourportfolio.com"
                autoFocus
                className={inputClass}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTextSubmit('portfolio', 'contact', true)}
                className={continueBtnClass}
              >
                {textValue.trim() ? 'Continue' : 'Skip'}
              </motion.button>
            </div>
          </StepWrapper>
        );

      case 'contact':
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg mx-auto px-4"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-2 text-center">
              Almost There
            </h2>
            <p className="text-muted-foreground text-center mb-8 font-sans text-sm">
              Share your details so our team can reach you
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={data.fullName}
                onChange={(e) => updateContact('fullName', e.target.value)}
                className={inputClass}
                required
              />
              <div>
                <PhoneInputField
                  value={data.phone}
                  onChange={(phone, isValid) => {
                    updateContact('phone', phone);
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
              <input
                type="email"
                placeholder="Email Address *"
                value={data.email}
                onChange={(e) => updateContact('email', e.target.value)}
                className={inputClass}
                required
              />
              <select
                value={data.preferredLanguage}
                onChange={(e) => updateContact('preferredLanguage', e.target.value)}
                className={inputClass}
              >
                <option value="">Preferred Language</option>
                {LANGUAGE_OPTIONS.map(lang => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!hasRequiredContact}
                className={continueBtnClass + ' mt-2'}
              >
                Review Summary
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <button onClick={handleBack} className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors">
                ← Go Back
              </button>
            </div>
          </motion.div>
        );

      case 'verify-pick':
        return (
          <motion.div
            key="verify-pick"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => goTo('contact')} />
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
                  Verify via SMS — {data.phone}
                </button>
                <button
                  onClick={() => handleMethodSelect('email')}
                  className="w-full py-3.5 rounded-xl border border-border bg-secondary text-secondary-foreground font-sans text-sm hover:border-primary/50 hover:bg-secondary/80 transition-all"
                >
                  Verify via Email — {data.email}
                </button>
              </div>
              <button
                onClick={() => goTo('contact')}
                className="mt-4 w-full text-center text-muted-foreground hover:text-foreground font-sans text-xs transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        );

      case 'otp':
        return (
          <OtpVerification
            key="otp"
            contactValue={pendingValue}
            method={verifyMethod!}
            sessionId={sessionId}
            phone={data.phone}
            email={data.email}
            leadType="job"
            onVerified={handleOtpVerified}
            onBack={() => goTo('verify-pick')}
            onResend={() => { if (verifyMethod) sendOtp(verifyMethod); }}
          />
        );

      case 'summary':
        return (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg mx-auto px-4"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-2 text-center">
              Review Summary
            </h2>
            <p className="text-muted-foreground text-center mb-6 font-sans text-sm">
              Please review your application details
            </p>

            <div className="glass-card rounded-2xl p-6 space-y-5">
              <div>
                <span className="text-primary font-sans font-semibold text-sm uppercase tracking-wider">
                  Job Application
                </span>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-3">
                <SummaryRow label="CV" value={data.cvFileName} />
                <SummaryRow label="Position" value={data.position} />
                <SummaryRow label="Education" value={data.education} />
                <SummaryRow label="Location" value={data.location} />
                <SummaryRow label="RE Experience" value={data.experience} />
                <SummaryRow label="Driving Licence" value={data.drivingLicence} />
                {data.portfolio && <SummaryRow label="Portfolio" value={data.portfolio} />}
              </div>

              <div className="h-px bg-border" />

              <div>
                <span className="text-primary font-sans font-semibold text-sm uppercase tracking-wider">
                  Contact Details
                </span>
              </div>

              <div className="space-y-3">
                <SummaryRow label="Full Name" value={data.fullName} />
                <SummaryRow label="Phone" value={data.phone} />
                <SummaryRow label="Email" value={data.email} />
                {data.preferredLanguage && <SummaryRow label="Language" value={data.preferredLanguage} />}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSubmit}
              className={continueBtnClass + ' mt-6'}
            >
              Submit Application
            </motion.button>

            <div className="mt-4 text-center">
              <button onClick={handleBack} className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors">
                ← Go Back
              </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <>
      {showProgressBar && (
        <div className="px-4 max-w-2xl mx-auto w-full py-4">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center py-8">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {showBackButton && (
        <div className="pb-6 text-center">
          <button onClick={handleBack} className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors">
            ← Go Back
          </button>
        </div>
      )}
    </>
  );
};

const StepWrapper = ({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className="w-full max-w-2xl mx-auto px-4"
  >
    <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-2 text-center">{title}</h2>
    {subtitle && <p className="text-muted-foreground text-center mb-8 font-sans text-sm">{subtitle}</p>}
    {!subtitle && <div className="mb-8" />}
    {children}
  </motion.div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start gap-4">
    <span className="text-muted-foreground font-sans text-sm flex-shrink-0">{label}</span>
    <span className="text-foreground font-sans text-sm font-medium text-right">{value}</span>
  </div>
);

export default JobApplicationFlow;
export type { JobStep };
