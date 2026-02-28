import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Zap, ArrowRight } from "lucide-react";

interface QueryInputProps {
  onSubmit: (query: string) => void;
}

export const QueryInput = ({ onSubmit }: QueryInputProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSubmit(query.trim());
  };

  const suggestions = [
    "Electric Vehicle Industry Analysis",
    "AI in Healthcare Market Outlook",
    "Renewable Energy Investment Trends",
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary font-mono">
          <Zap className="h-3.5 w-3.5" />
          Research Orchestration Engine
        </div>
        <h1 className="text-5xl font-bold tracking-tight">
          <span className="text-gradient-primary">Insight</span>{" "}
          <span className="text-foreground">AI</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Transform any query into a structured, multi-dimensional executive report.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-info/20 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity blur" />
          <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden">
            <Search className="h-5 w-5 text-muted-foreground ml-4 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your research query..."
              className="flex-1 bg-transparent px-4 py-4 text-foreground placeholder:text-muted-foreground outline-none text-lg"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="m-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md font-medium text-sm flex items-center gap-2 disabled:opacity-30 hover:opacity-90 transition-opacity"
            >
              Analyze
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-2"
      >
        <span className="text-muted-foreground text-sm mr-1">Try:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => {
              setQuery(s);
              onSubmit(s);
            }}
            className="text-sm px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-mono"
          >
            {s}
          </button>
        ))}
      </motion.div>
    </div>
  );
};
