import { motion } from 'framer-motion';

const ThankYou = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-lg mx-auto px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
      >
        <span className="text-3xl">✓</span>
      </motion.div>

      <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
        Thank You
      </h2>
      <p className="text-muted-foreground font-sans text-base mb-2 leading-relaxed">
        A <span className="text-primary font-semibold">KORE</span> property specialist will contact you shortly.
      </p>
      <p className="text-muted-foreground font-sans text-sm">
        We appreciate your interest and look forward to helping you find the perfect property in Dubai.
      </p>

      <div className="mt-10 glass-card rounded-2xl p-6">
        <p className="text-xs text-muted-foreground font-sans uppercase tracking-wider mb-2">KORE Real Estate</p>
        <p className="text-sm text-foreground/70 font-sans">Dubai's Premium Property Specialists</p>
      </div>
    </motion.div>
  );
};

export default ThankYou;
