import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QueryInput } from "@/components/QueryInput";
import { ReportView } from "@/components/ReportView";
import { ProcessingOverlay } from "@/components/ProcessingOverlay";
import { sampleReport } from "@/lib/sampleData";
import type { Report } from "@/lib/types";

const Index = () => {
  const [report, setReport] = useState<Report | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (query: string) => {
    setIsProcessing(true);
    // Simulate processing pipeline
    setTimeout(() => {
      setIsProcessing(false);
      setReport({ ...sampleReport, report_title: query });
    }, 3500);
  };

  const handleReset = () => {
    setReport(null);
  };

  return (
    <div className="min-h-screen bg-background bg-grid relative">
      <AnimatePresence mode="wait">
        {isProcessing && <ProcessingOverlay key="processing" />}
        {!report && !isProcessing && (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex min-h-screen flex-col items-center justify-center px-4"
          >
            <QueryInput onSubmit={handleSubmit} />
          </motion.div>
        )}
        {report && !isProcessing && (
          <motion.div
            key="report"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReportView report={report} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
