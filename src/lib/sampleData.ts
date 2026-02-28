import type { Report } from "./types";

export const sampleReport: Report = {
  report_title: "Electric Vehicle Industry Analysis",
  sections: [
    {
      header: "Executive Summary",
      format: "paragraph",
      content: [
        {
          text: "The global electric vehicle market is projected to reach $1.3 trillion by 2030, driven by regulatory pressure, declining battery costs, and shifting consumer preferences. Key markets include China, Europe, and North America, with China maintaining dominance at approximately 60% of global EV sales.",
          source_url: "https://www.iea.org/reports/global-ev-outlook-2024",
          confidence_score: 0.95,
        },
        {
          text: "Battery technology advancements, particularly solid-state batteries, are expected to reduce costs by 40% by 2028, significantly improving EV price parity with internal combustion engine vehicles.",
          source_url: "https://www.bloomberg.com/ev-outlook",
          confidence_score: 0.88,
        },
      ],
    },
    {
      header: "Market Feasibility",
      format: "table",
      content: [
        { metric: "Global Market Size (2024)", value: "$623B", source_url: "https://www.statista.com/ev-market", confidence_score: 0.92 },
        { metric: "Projected Market Size (2030)", value: "$1.3T", source_url: "https://www.iea.org/reports/global-ev-outlook-2024", confidence_score: 0.89 },
        { metric: "CAGR (2024-2030)", value: "13.1%", source_url: "https://www.grandviewresearch.com/ev", confidence_score: 0.87 },
        { metric: "Battery Cost Reduction", value: "-40% by 2028", source_url: "https://www.bloomberg.com/ev-outlook", confidence_score: 0.84 },
        { metric: "China Market Share", value: "~60%", source_url: "https://www.iea.org/reports/global-ev-outlook-2024", confidence_score: 0.93 },
      ],
    },
    {
      header: "Regulatory Landscape",
      format: "paragraph",
      content: [
        {
          text: "The EU has mandated a 100% ban on new ICE vehicle sales by 2035. The US Inflation Reduction Act provides up to $7,500 in tax credits for qualifying EVs, while China continues its NEV mandate system requiring manufacturers to earn credits through EV production.",
          source_url: "https://www.europarl.europa.eu/ev-ban",
          confidence_score: 0.96,
        },
      ],
    },
    {
      header: "Competitive Analysis",
      format: "table",
      content: [
        { metric: "Tesla Global Deliveries (2024)", value: "1.81M units", source_url: "https://ir.tesla.com", confidence_score: 0.97 },
        { metric: "BYD Global Sales (2024)", value: "3.02M units", source_url: "https://www.byd.com/investors", confidence_score: 0.94 },
        { metric: "VW Group EV Sales (2024)", value: "744K units", source_url: "https://www.volkswagen-group.com", confidence_score: 0.91 },
        { metric: "Hyundai-Kia EV Sales", value: "560K units", source_url: "https://www.hyundai.com/investors", confidence_score: 0.88 },
      ],
    },
    {
      header: "Technology Outlook",
      format: "mixed",
      content: [
        {
          text: "Solid-state batteries represent the next inflection point in EV technology. Toyota, Samsung SDI, and QuantumScape are leading development efforts, with commercial availability expected between 2027-2029. These batteries promise 2x energy density and faster charging times.",
          source_url: "https://www.nature.com/articles/solid-state-ev",
          confidence_score: 0.82,
        },
        { metric: "Avg. Battery Pack Cost (2024)", value: "$115/kWh", source_url: "https://www.bloomberg.com/bnef", confidence_score: 0.91 },
        { metric: "Target Cost for Parity", value: "$80/kWh", source_url: "https://www.energy.gov/eere", confidence_score: 0.85 },
      ],
    },
  ],
  financial_analysis: {
    industry_name: "Electric Vehicle Industry",
    related_stocks: [
      { ticker: "TSLA", metrics: { CAGR: "25%", EPS: "$3.50", market_cap: "$900B", "P/E": "68x" }, confidence_score: 0.93 },
      { ticker: "BYD", metrics: { CAGR: "42%", EPS: "¥14.20", market_cap: "$105B", "P/E": "22x" }, confidence_score: 0.90 },
      { ticker: "RIVN", metrics: { CAGR: "N/A", EPS: "-$5.70", market_cap: "$14B", "P/E": "N/A" }, confidence_score: 0.86 },
      { ticker: "LI", metrics: { CAGR: "68%", EPS: "$0.85", market_cap: "$24B", "P/E": "28x" }, confidence_score: 0.87 },
    ],
    industry_growth_prediction: "High growth expected. EV adoption curves are accelerating across all major markets, with China leading and Europe following closely.",
  },
  global_confidence_score: 0.89,
};
