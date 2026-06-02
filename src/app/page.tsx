"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { PersonalInfoSection } from "@/components/resume/personal-info-section";
import { SummarySection } from "@/components/resume/summary-section";
import { ExperienceSection } from "@/components/resume/experience-section";
import { EducationSection } from "@/components/resume/education-section";
import { SkillsSection } from "@/components/resume/skills-section";
import { ResumePreview } from "@/components/resume/resume-preview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  FileText,
  FileSpreadsheet,
  Eye,
  PenLine,
  Loader2,
  CheckCircle2,
  Cloud,
  Shield,
  Zap,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

const FORM_TABS = [
  { value: "personal", label: "Personal", icon: PenLine },
  { value: "summary", label: "Summary", icon: FileText },
  { value: "experience", label: "Experience", icon: Cloud },
  { value: "education", label: "Education", icon: Shield },
  { value: "skills", label: "Skills", icon: Zap },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [generating, setGenerating] = useState<"pdf" | "docx" | null>(null);
  const [generated, setGenerated] = useState<"pdf" | "docx" | null>(null);
  const resetResume = useResumeStore((s) => s.resetResume);

  const handleGenerate = async (format: "pdf" | "docx") => {
    const resume = useResumeStore.getState();

    // Validate minimum data
    if (!resume.personalInfo.fullName || !resume.personalInfo.email) {
      toast.error("Please fill in your name and email at minimum");
      return;
    }

    setGenerating(format);
    setGenerated(null);

    try {
      const endpoint = `/api/generate/${format}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Generation failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safeName = resume.personalInfo.fullName.replace(/\s+/g, "_") || "resume";
      a.download = `${safeName}_Resume.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setGenerated(format);
      toast.success(
        format === "pdf"
          ? "PDF resume downloaded successfully"
          : "DOCX resume downloaded successfully"
      );
    } catch (err) {
      toast.error(
        `Failed to generate ${format.toUpperCase()}: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                <Cloud className="size-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-semibold leading-tight">
                  CloudResume
                </h1>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  ATS-Friendly Resume Builder
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetResume}
                className="text-xs text-muted-foreground"
              >
                <RotateCcw className="size-3.5 mr-1" />
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={generating === "docx"}
                onClick={() => handleGenerate("docx")}
              >
                {generating === "docx" ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : generated === "docx" ? (
                  <CheckCircle2 className="size-3.5 text-green-600" />
                ) : (
                  <FileSpreadsheet className="size-3.5" />
                )}
                <span className="hidden sm:inline">Download DOC</span>
              </Button>
              <Button
                size="sm"
                disabled={generating === "pdf"}
                onClick={() => handleGenerate("pdf")}
              >
                {generating === "pdf" ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : generated === "pdf" ? (
                  <CheckCircle2 className="size-3.5" />
                ) : (
                  <Download className="size-3.5" />
                )}
                <span className="hidden sm:inline">Download PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Form Builder */}
          <div className="space-y-4">
            {/* Landing Info */}
            <div className="bg-white rounded-xl border p-5 space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="size-5 text-primary" />
                Build Your ATS-Friendly Resume
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Create a clean, professional resume optimized for Applicant
                Tracking Systems. Our format ensures maximum parseability while
                presenting your cloud engineering expertise effectively. Fill out
                each section below, preview in real-time, and download in PDF or
                DOC format.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  ATS Optimized
                </span>
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  Cloud Engineer Focus
                </span>
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  PDF & DOC Export
                </span>
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  Real-time Preview
                </span>
              </div>
            </div>

            {/* Form Tabs */}
            <div className="bg-white rounded-xl border p-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full flex mb-4 bg-muted/50 h-auto p-1 flex-wrap">
                  {FORM_TABS.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="flex-1 min-w-0 text-xs gap-1 px-2 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      <tab.icon className="size-3.5 shrink-0" />
                      <span className="truncate hidden sm:inline">
                        {tab.label}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="personal" className="mt-0">
                  <PersonalInfoSection />
                </TabsContent>
                <TabsContent value="summary" className="mt-0">
                  <SummarySection />
                </TabsContent>
                <TabsContent value="experience" className="mt-0">
                  <ExperienceSection />
                </TabsContent>
                <TabsContent value="education" className="mt-0">
                  <EducationSection />
                </TabsContent>
                <TabsContent value="skills" className="mt-0">
                  <SkillsSection />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border p-4 lg:sticky lg:top-[72px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Eye className="size-4 text-muted-foreground" />
                  Live Preview
                </h3>
                <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                  ATS-Friendly Format
                </span>
              </div>
              <ResumePreview />

              {/* Generate CTA */}
              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
                <h4 className="text-sm font-semibold mb-1">
                  Ready to download?
                </h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Your resume will be generated in a clean, ATS-parseable format.
                  Both PDF and DOC formats preserve proper heading structures and
                  plain-text readability.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    disabled={generating === "pdf"}
                    onClick={() => handleGenerate("pdf")}
                    className="flex-1"
                  >
                    {generating === "pdf" ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Download className="size-3.5" />
                    )}
                    Generate PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={generating === "docx"}
                    onClick={() => handleGenerate("docx")}
                    className="flex-1"
                  >
                    {generating === "docx" ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <FileSpreadsheet className="size-3.5" />
                    )}
                    Generate DOC
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <p>CloudResume Builder — ATS-Friendly Resume Generator for Cloud Engineers</p>
            <p>No data stored. Your information stays in your browser.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
