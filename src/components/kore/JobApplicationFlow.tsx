import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface JobData {
  cvFileName: string;
  position: string;
  education: string;
  location: string;
  experience: string;
  drivingLicence: string;
  linkedin: string;
}

type JobStep = 'upload' | 'position' | 'education' | 'location' | 'experience' | 'licence' | 'linkedin' | 'summary';

const STEPS: JobStep[] = ['upload', 'position', 'education', 'location', 'experience', 'licence', 'linkedin', 'summary'];

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
    linkedin: '',
  });
  const [textValue, setTextValue] = useState('');

  const goTo = useCallback((s: JobStep) => {
    setStep(s);
    onStepChange?.(s);
  }, [onStepChange]);

  const currentIndex = STEPS.indexOf(step);
  const progress = currentIndex / (STEPS.length - 1);

  const handleBack = () => {
    if (currentIndex === 0) {
      onBack();
      return;
    }
    goTo(STEPS[currentIndex - 1]);
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

  const selectBtnClass = "group relative px-6 py-4 rounded-xl border border-border bg-card text-card-foreground font-sans text-base hover:border-primary hover:bg-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 text-left";
  const inputClass = "w-full px-6 py-4 rounded-xl border border-border bg-card text-foreground font-sans text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300";
  const continueBtnClass = "w-full py-4 rounded-xl font-sans font-semibold text-base bg-primary text-primary-foreground disabled:opacity-40 transition-all duration-300";

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
        return (
          <StepWrapper key="location" title="Location of Residence" subtitle="Where are you currently based?">
            <div className="space-y-4">
              <input
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
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
                  onClick={() => handleSelect('drivingLicence', val, 'linkedin')}
                  className={selectBtnClass}
                >
                  <span className="group-hover:text-primary transition-colors">{val}</span>
                </motion.button>
              ))}
            </div>
          </StepWrapper>
        );

      case 'linkedin':
        return (
          <StepWrapper key="linkedin" title="LinkedIn Profile" subtitle="Optional — share your LinkedIn URL">
            <div className="space-y-4">
              <input
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit('linkedin', 'summary', true)}
                placeholder="https://linkedin.com/in/yourprofile"
                autoFocus
                className={inputClass}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTextSubmit('linkedin', 'summary', true)}
                className={continueBtnClass}
              >
                {textValue.trim() ? 'Continue' : 'Skip'}
              </motion.button>
            </div>
          </StepWrapper>
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
              Almost There
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
                {data.linkedin && <SummaryRow label="LinkedIn" value={data.linkedin} />}
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
      {step !== 'summary' && (
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

      {step !== 'summary' && (
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
