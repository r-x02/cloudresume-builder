import { NextRequest, NextResponse } from "next/server";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from "docx";
import type { ResumeData } from "@/types/resume";

export async function POST(request: NextRequest) {
  try {
    const data: ResumeData = await request.json();

    const children: Paragraph[] = [];

    // ── Header: Name ──
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: data.personalInfo.fullName || "Your Name",
            bold: true,
            size: 48, // 24pt
            font: "Calibri",
            color: "1a1a1a",
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
      })
    );

    // ── Header: Job Title ──
    if (data.personalInfo.jobTitle) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: data.personalInfo.jobTitle,
              size: 24, // 12pt
              font: "Calibri",
              color: "555555",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
        })
      );
    }

    // ── Header: Contact Info ──
    const contactParts: string[] = [];
    if (data.personalInfo.location) contactParts.push(data.personalInfo.location);
    if (data.personalInfo.email) contactParts.push(data.personalInfo.email);
    if (data.personalInfo.phone) contactParts.push(data.personalInfo.phone);
    if (data.personalInfo.linkedin) contactParts.push(data.personalInfo.linkedin);
    if (data.personalInfo.github) contactParts.push(data.personalInfo.github);
    if (data.personalInfo.website) contactParts.push(data.personalInfo.website);

    if (contactParts.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: contactParts.join(" | "),
              size: 20, // 10pt
              font: "Calibri",
              color: "666666",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 6, color: "cccccc" },
          },
        })
      );
    }

    // ── Helper: Section Heading ──
    function sectionHeading(text: string) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: text.toUpperCase(),
              bold: true,
              size: 22, // 11pt
              font: "Calibri",
              color: "1a1a1a",
            }),
          ],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 4, color: "dddddd" },
          },
        })
      );
    }

    // ── Professional Summary ──
    if (data.summary) {
      sectionHeading("Professional Summary");
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: data.summary,
              size: 21, // 10.5pt
              font: "Calibri",
              color: "333333",
            }),
          ],
          spacing: { after: 120 },
        })
      );
    }

    // ── Professional Experience ──
    const validExperience = data.experience.filter(
      (e) => e.jobTitle || e.company
    );
    if (validExperience.length > 0) {
      sectionHeading("Professional Experience");

      for (const exp of validExperience) {
        // Job title and company
        const titleLine = [exp.jobTitle, exp.company]
          .filter(Boolean)
          .join(" — ");
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: titleLine,
                bold: true,
                size: 22,
                font: "Calibri",
                color: "1a1a1a",
              }),
            ],
            spacing: { before: 120, after: 40 },
          })
        );

        // Dates and location
        const dateParts: string[] = [];
        if (exp.startDate) dateParts.push(exp.startDate);
        if (exp.endDate) dateParts.push(exp.endDate);
        const dateStr = dateParts.join(" – ");
        const metaParts = [dateStr, exp.location].filter(Boolean).join(" | ");

        if (metaParts) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: metaParts,
                  italics: true,
                  size: 20,
                  font: "Calibri",
                  color: "666666",
                }),
              ],
              spacing: { after: 60 },
            })
          );
        }

        // Bullet points
        const bullets = exp.bullets.filter((b) => b.trim());
        for (const bullet of bullets) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: bullet,
                  size: 21,
                  font: "Calibri",
                  color: "333333",
                }),
              ],
              bullet: { level: 0 },
              spacing: { after: 40 },
            })
          );
        }
      }
    }

    // ── Education ──
    const validEducation = data.education.filter(
      (e) => e.degree || e.institution
    );
    if (validEducation.length > 0) {
      sectionHeading("Education");

      for (const edu of validEducation) {
        const degreeLine = [edu.degree, edu.institution]
          .filter(Boolean)
          .join(" — ");
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: degreeLine,
                bold: true,
                size: 22,
                font: "Calibri",
                color: "1a1a1a",
              }),
            ],
            spacing: { before: 80, after: 40 },
          })
        );

        const eduDateParts: string[] = [];
        if (edu.startDate) eduDateParts.push(edu.startDate);
        if (edu.endDate) eduDateParts.push(edu.endDate);
        const eduDateStr = eduDateParts.join(" – ");

        if (eduDateStr) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: eduDateStr,
                  italics: true,
                  size: 20,
                  font: "Calibri",
                  color: "666666",
                }),
              ],
              spacing: { after: 20 },
            })
          );
        }

        if (edu.honors) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.honors,
                  size: 20,
                  font: "Calibri",
                  color: "444444",
                }),
              ],
              spacing: { after: 40 },
            })
          );
        }
      }
    }

    // ── Technical Skills ──
    const validSkills = data.skills.filter((s) => s.skills.trim());
    if (validSkills.length > 0) {
      sectionHeading("Technical Skills");

      for (const skill of validSkills) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${skill.category}: `,
                bold: true,
                size: 21,
                font: "Calibri",
                color: "1a1a1a",
              }),
              new TextRun({
                text: skill.skills,
                size: 21,
                font: "Calibri",
                color: "333333",
              }),
            ],
            spacing: { after: 40 },
          })
        );
      }
    }

    // ── Certifications ──
    const certLines = data.certifications
      .split("\n")
      .map((c) => c.trim())
      .filter(Boolean);

    if (certLines.length > 0) {
      sectionHeading("Certifications");

      for (const cert of certLines) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: cert,
                size: 21,
                font: "Calibri",
                color: "333333",
              }),
            ],
            bullet: { level: 0 },
            spacing: { after: 40 },
          })
        );
      }
    }

    // ── Build Document ──
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 720, // 0.5 inch
                bottom: 720,
                left: 720,
                right: 720,
              },
            },
          },
          children,
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": "attachment; filename=resume.docx",
      },
    });
  } catch (error) {
    console.error("DOCX generation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to generate DOCX",
      },
      { status: 500 }
    );
  }
}
