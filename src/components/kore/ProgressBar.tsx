import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0 to 1
  label?: string;
}

const ProgressBar = ({ progress, label }: ProgressBarProps) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-sans">{label}</span>
          <span className="text-primary font-sans font-medium">{Math.round(progress * 100)}%</span>
        </div>
      )}
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, hsl(38 45% 38%), hsl(38 55% 55%), hsl(38 60% 70%))' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
