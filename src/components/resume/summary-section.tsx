"use client";

import { useResumeStore } from "@/store/resume-store";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const MAX_WORDS = 100;

export function SummarySection() {
  const summary = useResumeStore((s) => s.summary);
  const setSummary = useResumeStore((s) => s.setSummary);

  const wordCount = summary
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const isOverLimit = wordCount > MAX_WORDS;

  const handleChange = (value: string) => {
    setSummary(value);
  };

  return (
    <div className="space-y-4">
      <CardHeader className="p-0 pt-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="size-5 text-muted-foreground" />
          Professional Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-3">
        <div className="space-y-2">
          <Label htmlFor="summary">
            Write a concise summary highlighting your cloud engineering expertise
          </Label>
          <Textarea
            id="summary"
            placeholder="Results-driven Cloud Engineer with 8+ years of experience designing, deploying, and managing scalable cloud infrastructure across AWS, Azure, and GCP. Proven track record of reducing operational costs by 40% through infrastructure optimization and automation."
            className="min-h-[120px] resize-y"
            value={summary}
            onChange={(e) => handleChange(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Keep it concise. Focus on key achievements and core competencies.
            </p>
            <p
              className={`text-xs font-medium tabular-nums ${
                isOverLimit ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {wordCount}/{MAX_WORDS} words
            </p>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
