"use client";

import { useResumeStore } from "@/store/resume-store";
import { Separator } from "@/components/ui/separator";

export function ResumePreview() {
  const resume = useResumeStore();

  const hasContent =
    resume.personalInfo.fullName ||
    resume.summary ||
    resume.experience.some((e) => e.jobTitle || e.company) ||
    resume.education.some((e) => e.degree || e.institution) ||
    resume.skills.some((s) => s.skills);

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] text-muted-foreground p-8">
        <div className="text-center space-y-3">
          <svg
            className="mx-auto size-16 text-muted-foreground/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-sm font-medium">Start filling in your details</p>
          <p className="text-xs">
            Your ATS-friendly resume preview will appear here in real-time
          </p>
        </div>
      </div>
    );
  }

  const { personalInfo, summary, experience, education, skills, certifications } =
    resume;

  const certLines = certifications
    .split("\n")
    .map((c) => c.trim())
    .filter(Boolean);

  return (
    <div className="bg-white text-gray-900 shadow-sm border rounded-lg p-6 md:p-8 min-h-[600px] font-sans text-[13px] leading-relaxed">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-sm text-gray-600 mt-1 font-medium">
          {personalInfo.jobTitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.email && (
            <>
              {personalInfo.location && <span className="text-gray-300">|</span>}
              <span>{personalInfo.email}</span>
            </>
          )}
          {personalInfo.phone && (
            <>
              <span className="text-gray-300">|</span>
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span className="text-gray-300">|</span>
              <span>{personalInfo.linkedin}</span>
            </>
          )}
          {personalInfo.github && (
            <>
              <span className="text-gray-300">|</span>
              <span>{personalInfo.github}</span>
            </>
          )}
          {personalInfo.website && (
            <>
              <span className="text-gray-300">|</span>
              <span>{personalInfo.website}</span>
            </>
          )}
        </div>
      </div>

      <Separator className="bg-gray-200 mb-4" />

      {/* Professional Summary */}
      {summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.some((e) => e.jobTitle || e.company) && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
            Professional Experience
          </h2>
          {experience
            .filter((e) => e.jobTitle || e.company)
            .map((exp) => {
              const bullets = exp.bullets.filter((b) => b.trim());
              return (
                <div key={exp.id} className="mb-4 last:mb-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <span className="font-semibold text-gray-900">
                        {exp.jobTitle}
                      </span>
                      {exp.company && (
                        <span className="text-gray-700">
                          {" "}
                          — {exp.company}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 shrink-0 mt-0.5 sm:mt-0">
                      {[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
                      {exp.location && ` | ${exp.location}`}
                    </div>
                  </div>
                  {bullets.length > 0 && (
                    <ul className="mt-1.5 space-y-1 list-disc list-outside ml-4">
                      {bullets.map((bullet, i) => (
                        <li key={i} className="text-gray-700">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
        </div>
      )}

      {/* Education */}
      {education.some((e) => e.degree || e.institution) && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
            Education
          </h2>
          {education
            .filter((e) => e.degree || e.institution)
            .map((edu) => (
              <div key={edu.id} className="mb-2 last:mb-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <span className="font-semibold text-gray-900">
                      {edu.degree}
                    </span>
                    {edu.institution && (
                      <span className="text-gray-700">
                        {" "}
                        — {edu.institution}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 shrink-0 mt-0.5 sm:mt-0">
                    {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
                  </div>
                </div>
                {edu.honors && (
                  <p className="text-gray-600 text-xs mt-0.5">{edu.honors}</p>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Skills */}
      {skills.some((s) => s.skills) && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
            Technical Skills
          </h2>
          <div className="space-y-1.5">
            {skills
              .filter((s) => s.skills)
              .map((skill) => (
                <div key={skill.id} className="flex gap-2">
                  <span className="font-semibold text-gray-800 shrink-0">
                    {skill.category}:
                  </span>
                  <span className="text-gray-700">
                    {skill.skills}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certLines.length > 0 && (
        <div className="mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
            Certifications
          </h2>
          <ul className="space-y-1 list-disc list-outside ml-4">
            {certLines.map((cert, i) => (
              <li key={i} className="text-gray-700">
                {cert}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
