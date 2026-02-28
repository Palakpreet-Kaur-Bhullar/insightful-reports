import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const steps = [
  "Validating query & detecting intent...",
  "Generating sub-queries...",
  "Searching web sources...",
  "Extracting evidence...",
  "Synthesizing report sections...",
  "Running integrity checks...",
];

export const ProcessingOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm z-50"
    >
      <div className="space-y-8 text-center">
        <Loader2 className="h-10 w-10 text-primary mx-auto animate-spin" />
        <div className="space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.5 }}
              className="flex items-center gap-3 text-sm font-mono"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.5 + 0.3 }}
                className="h-1.5 w-1.5 rounded-full bg-primary"
              />
              <span className="text-muted-foreground">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
