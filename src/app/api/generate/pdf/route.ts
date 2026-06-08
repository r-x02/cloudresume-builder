import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";
import type { ResumeData } from "@/types/resume";

const PDF_SCRIPT = path.join(
  process.cwd(),
  "skills/pdf/scripts/html2pdf-next.js"
);

const EN_DASH = "\u2013"; // –
const EM_DASH = "\u2014"; // —

function generateResumeHTML(data: ResumeData): string {
  const { personalInfo, summary, experience, education, projects, skills, certifications } =
    data;

  const validExperience = experience.filter((e) => e.jobTitle || e.company);
  const validEducation = education.filter((e) => e.degree || e.institution);
  const validProjects = projects.filter((p) => p.name);
  const validSkills = skills.filter((s) => s.skills.trim());
  const certLines = certifications
    .split("\n")
    .map((c) => c.trim())
    .filter(Boolean);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html, body {
      min-height: auto;
      height: auto;
    }
    body {
      font-family: "Cambria", "Georgia", "Times New Roman", serif;
      font-size: 10pt;
      line-height: 1.5;
      color: #333333;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header {
      text-align: center;
      margin-bottom: 16pt;
      padding-bottom: 12pt;
      border-bottom: 1px solid #cccccc;
    }
    .header h1 {
      font-size: 22pt;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: 0.5pt;
      margin-bottom: 4pt;
    }
    .header .job-title {
      font-size: 11pt;
      color: #555555;
      font-weight: 500;
      margin-bottom: 6pt;
    }
    .header .contact-info {
      font-size: 9pt;
      color: #666666;
    }
    .section {
      margin-bottom: 14pt;
    }
    .section:last-child {
      margin-bottom: 0;
    }
    .section-title {
      font-size: 10pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1pt;
      color: #1a1a1a;
      padding-bottom: 4pt;
      border-bottom: 1px solid #dddddd;
      margin-bottom: 8pt;
    }
    .summary-text {
      font-size: 10pt;
      line-height: 1.6;
      color: #333333;
    }
    .experience-item {
      margin-bottom: 10pt;
    }
    .experience-item:last-child {
      margin-bottom: 0;
    }
    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .experience-title {
      font-size: 10.5pt;
      font-weight: 700;
      color: #1a1a1a;
      flex: 1;
    }
    .experience-meta {
      font-size: 9pt;
      color: #666666;
      font-style: italic;
      text-align: right;
      white-space: nowrap;
      margin-left: 12pt;
    }
    .experience-bullets {
      margin-top: 4pt;
      margin-left: 14pt;
    }
    .experience-bullets li {
      font-size: 9.5pt;
      line-height: 1.5;
      color: #333333;
      margin-bottom: 2pt;
    }
    .education-item {
      margin-bottom: 8pt;
    }
    .education-item:last-child {
      margin-bottom: 0;
    }
    .education-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .education-degree {
      font-size: 10.5pt;
      font-weight: 700;
      color: #1a1a1a;
      flex: 1;
    }
    .education-date {
      font-size: 9pt;
      color: #666666;
      font-style: italic;
      white-space: nowrap;
      margin-left: 12pt;
    }
    .education-honors {
      font-size: 9pt;
      color: #444444;
      margin-top: 2pt;
    }
    .project-item {
      margin-bottom: 10pt;
    }
    .project-item:last-child {
      margin-bottom: 0;
    }
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .project-name {
      font-size: 10.5pt;
      font-weight: 700;
      color: #1a1a1a;
      flex: 1;
    }
    .project-date {
      font-size: 9pt;
      color: #666666;
      font-style: italic;
      white-space: nowrap;
      margin-left: 12pt;
    }
    .project-tech {
      font-size: 9pt;
      color: #666666;
      font-style: italic;
      margin-top: 2pt;
    }
    .project-desc {
      font-size: 9.5pt;
      line-height: 1.5;
      color: #333333;
      margin-top: 4pt;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 16pt;
      row-gap: 4pt;
    }
    .skill-row {
      margin-bottom: 3pt;
      font-size: 9.5pt;
      color: #333333;
    }
    .skill-category {
      font-weight: 700;
      color: #1a1a1a;
    }
    .cert-list {
      margin-left: 14pt;
    }
    .cert-list li {
      font-size: 9.5pt;
      color: #333333;
      margin-bottom: 2pt;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${escapeHtml(personalInfo.fullName || "Your Name")}</h1>
    ${
      personalInfo.jobTitle
        ? `<div class="job-title">${escapeHtml(personalInfo.jobTitle)}</div>`
        : ""
    }
    <div class="contact-info">
      ${buildContactInfo(personalInfo)}
    </div>
  </div>

  ${
    summary
      ? `
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <div class="summary-text">${escapeHtml(summary)}</div>
  </div>`
      : ""
  }

  ${
    validExperience.length > 0
      ? `
  <div class="section">
    <div class="section-title">Professional Experience</div>
    ${validExperience
      .map((exp) => {
        const bullets = exp.bullets.filter((b) => b.trim());
        const dateParts = [exp.startDate, exp.endDate].filter(Boolean);
        const dateStr = dateParts.join(" " + EN_DASH + " ");
        const metaStr = [dateStr, exp.location].filter(Boolean).join(" | ");

        return `
    <div class="experience-item">
      <div class="experience-header">
        <div class="experience-title">${escapeHtml([exp.jobTitle, exp.company].filter(Boolean).join(" " + EM_DASH + " "))}</div>
        <div class="experience-meta">${escapeHtml(metaStr)}</div>
      </div>
      ${
        bullets.length > 0
          ? `<ul class="experience-bullets">
        ${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("\n      ")}
      </ul>`
          : ""
      }
    </div>`;
      })
      .join("\n")}
  </div>`
      : ""
  }

  ${
    validEducation.length > 0
      ? `
  <div class="section">
    <div class="section-title">Education</div>
    ${validEducation
      .map((edu) => {
        const dateParts = [edu.startDate, edu.endDate].filter(Boolean);
        const dateStr = dateParts.join(" " + EN_DASH + " ");
        return `
    <div class="education-item">
      <div class="education-header">
        <div class="education-degree">${escapeHtml([edu.degree, edu.institution].filter(Boolean).join(" " + EM_DASH + " "))}</div>
        <div class="education-date">${escapeHtml(dateStr)}</div>
      </div>
      ${
        edu.honors
          ? `<div class="education-honors">${escapeHtml(edu.honors)}</div>`
          : ""
      }
    </div>`;
      })
      .join("\n")}
  </div>`
      : ""
  }

  ${
    validProjects.length > 0
      ? `
  <div class="section">
    <div class="section-title">Projects</div>
    ${validProjects
      .map((proj) => {
        const dateParts = [proj.startDate, proj.endDate].filter(Boolean);
        const dateStr = dateParts.join(" " + EN_DASH + " ");
        return `
    <div class="project-item">
      <div class="project-header">
        <div class="project-name">${escapeHtml(proj.name)}${proj.link ? " <span style='font-size:9pt;color:#666;font-weight:normal;margin-left:8pt;'>" + escapeHtml(proj.link) + "</span>" : ""}</div>
        <div class="project-date">${escapeHtml(dateStr)}</div>
      </div>
      ${proj.technologies ? `<div class="project-tech">${escapeHtml(proj.technologies)}</div>` : ""}
      ${proj.description ? `<div class="project-desc">${escapeHtml(proj.description)}</div>` : ""}
    </div>`;
      })
      .join("\n")}
  </div>`
      : ""
  }

  ${
    validSkills.length > 0
      ? `
  <div class="section">
    <div class="section-title">Technical Skills</div>
    <div class="skills-grid">
    ${validSkills
      .map(
        (s) =>
          `<div class="skill-row"><span class="skill-category">${escapeHtml(s.category)}:</span> ${escapeHtml(s.skills)}</div>`
      )
      .join("\n    ")}
    </div>
  </div>`
      : ""
  }

  ${
    certLines.length > 0
      ? `
  <div class="section">
    <div class="section-title">Certifications</div>
    <ul class="cert-list">
    ${certLines.map((c) => `<li>${escapeHtml(c)}</li>`).join("\n    ")}
    </ul>
  </div>`
      : ""
  }
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildContactInfo(info: ResumeData["personalInfo"]): string {
  const parts: string[] = [];
  if (info.location) parts.push(escapeHtml(info.location));
  if (info.email) parts.push(escapeHtml(info.email));
  if (info.phone) parts.push(escapeHtml(info.phone));
  if (info.linkedin) parts.push(escapeHtml(info.linkedin));
  if (info.github) parts.push(escapeHtml(info.github));
  if (info.website) parts.push(escapeHtml(info.website));
  return parts.join(" &nbsp;|&nbsp; ");
}

export async function POST(request: NextRequest) {
  try {
    const data: ResumeData = await request.json();

    const htmlContent = generateResumeHTML(data);
    const tmpDir = os.tmpdir();
    const tmpHtml = path.join(tmpDir, `resume_${Date.now()}.html`);
    const tmpPdf = path.join(tmpDir, `resume_${Date.now()}.pdf`);

    try {
      fs.writeFileSync(tmpHtml, htmlContent, "utf-8");

      if (!fs.existsSync(PDF_SCRIPT)) {
        throw new Error("PDF generation script not found");
      }

      execSync(
        `node "${PDF_SCRIPT}" "${tmpHtml}" --output "${tmpPdf}" --title "${data.personalInfo.fullName || "Resume"} - Resume"`,
        {
          timeout: 30000,
          stdio: ["pipe", "pipe", "pipe"],
        }
      );

      if (!fs.existsSync(tmpPdf)) {
        throw new Error("PDF file was not generated");
      }

      const pdfBuffer = fs.readFileSync(tmpPdf);

      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=resume.pdf",
        },
      });
    } finally {
      try {
        if (fs.existsSync(tmpHtml)) fs.unlinkSync(tmpHtml);
        if (fs.existsSync(tmpPdf)) fs.unlinkSync(tmpPdf);
      } catch (_) {
        // Ignore cleanup errors
      }
    }
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to generate PDF",
      },
      { status: 500 }
    );
  }
}
