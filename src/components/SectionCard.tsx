import { ExternalLink } from "lucide-react";
import type { ReportSection } from "@/lib/types";
import { ConfidenceBadge } from "./ConfidenceBadge";

interface SectionCardProps {
  section: ReportSection;
}

export const SectionCard = ({ section }: SectionCardProps) => {
  const isTable = section.format === "table";

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{section.header}</h2>

      {isTable ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-mono text-muted-foreground font-medium">Metric</th>
                <th className="text-right py-2 px-3 font-mono text-muted-foreground font-medium">Value</th>
                <th className="text-right py-2 px-3 font-mono text-muted-foreground font-medium">Conf.</th>
                <th className="text-right py-2 pl-3 font-mono text-muted-foreground font-medium">Source</th>
              </tr>
            </thead>
            <tbody>
              {section.content.map((item, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-2.5 pr-4 text-foreground">{item.metric}</td>
                  <td className="text-right py-2.5 px-3 font-mono font-semibold text-foreground">{item.value}</td>
                  <td className="text-right py-2.5 px-3">
                    <ConfidenceBadge score={item.confidence_score} />
                  </td>
                  <td className="text-right py-2.5 pl-3">
                    <a
                      href={item.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-4">
          {section.content.map((item, i) => (
            <div key={i}>
              {item.text && (
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  {item.text}
                  <a
                    href={item.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 ml-2 text-primary text-xs hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <ConfidenceBadge score={item.confidence_score} />
                  </a>
                </p>
              )}
              {item.metric && (
                <div className="flex items-center justify-between bg-secondary/30 rounded px-3 py-2 mt-2">
                  <span className="text-sm text-muted-foreground">{item.metric}</span>
                  <span className="font-mono font-semibold text-foreground">{item.value}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
