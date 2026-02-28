import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QueryInput } from "@/components/QueryInput";
import { ReportView } from "@/components/ReportView";
import { ProcessingOverlay } from "@/components/ProcessingOverlay";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Report, ResearchQuery } from "@/lib/types";

const Index = () => {
  const [report, setReport] = useState<Report | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (research: ResearchQuery) => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("research", {
        body: research,
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setReport(data as Report);
    } catch (err: any) {
      console.error("Research error:", err);
      toast({
        title: "Research failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
