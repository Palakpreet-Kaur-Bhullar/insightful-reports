import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, TrendingUp } from "lucide-react";
import type { Report } from "@/lib/types";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { SectionCard } from "./SectionCard";

interface ReportViewProps {
  report: Report;
  onReset: () => void;
}

export const ReportView = ({ report, onReset }: ReportViewProps) => {
  const { financial_analysis: fin } = report;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between gap-4"
      >
        <div className="space-y-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="h-4 w-4" /> New query
          </button>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {report.report_title}
          </h1>
          <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
            <span>{report.sections.length} sections</span>
            <span>·</span>
            <span>
              Global confidence:{" "}
              <ConfidenceBadge score={report.global_confidence_score} />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Sections */}
      <div className="space-y-6">
        {report.sections.map((section, i) => (
          <motion.div
            key={section.header}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <SectionCard section={section} />
          </motion.div>
        ))}
      </div>

      {/* Financial Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: report.sections.length * 0.08 }}
        className="rounded-lg border border-border bg-card p-6 space-y-5"
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold text-foreground">
            Financial Analysis — {fin.industry_name}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-mono text-muted-foreground font-medium">Ticker</th>
                {Object.keys(fin.related_stocks[0]?.metrics || {}).map((k) => (
                  <th key={k} className="text-right py-2 px-3 font-mono text-muted-foreground font-medium">{k}</th>
                ))}
                <th className="text-right py-2 pl-3 font-mono text-muted-foreground font-medium">Conf.</th>
              </tr>
            </thead>
            <tbody>
              {fin.related_stocks.map((stock) => (
                <tr key={stock.ticker} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-2.5 pr-4 font-mono font-semibold text-primary">{stock.ticker}</td>
                  {Object.values(stock.metrics).map((v, i) => (
                    <td key={i} className="text-right py-2.5 px-3 font-mono text-foreground">{v}</td>
                  ))}
                  <td className="text-right py-2.5 pl-3">
                    <ConfidenceBadge score={stock.confidence_score} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground border-l-2 border-accent/50 pl-3">
          {fin.industry_growth_prediction}
        </p>
      </motion.div>
    </div>
  );
};
