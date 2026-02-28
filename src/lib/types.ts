export interface ResearchQuery {
  query: string;
  objective: string;
  user_role: string;
  scale: "Global" | "Country" | "Regional" | "Local";
  additional_notes: string;
}

export interface ReportSection {
  header: string;
  format: "paragraph" | "table" | "mixed";
  content: ContentItem[];
}

export interface ContentItem {
  text?: string;
  metric?: string;
  value?: string;
  source_url: string;
  confidence_score: number;
}

export interface StockMetrics {
  ticker: string;
  metrics: Record<string, string>;
  confidence_score: number;
}

export interface FinancialAnalysis {
  industry_name: string;
  related_stocks: StockMetrics[];
  industry_growth_prediction: string;
}

export interface Report {
  report_title: string;
  user_role?: string;
  objective?: string;
  scale?: string;
  sections: ReportSection[];
  financial_analysis: FinancialAnalysis;
  global_confidence_score: number;
}
