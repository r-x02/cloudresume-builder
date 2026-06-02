"use client";

import { useResumeStore } from "@/store/resume-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GraduationCap, Plus, Trash2, GripVertical } from "lucide-react";

export function EducationSection() {
  const education = useResumeStore((s) => s.education);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);

  return (
    <div className="space-y-4">
      <CardHeader className="p-0 pt-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <GraduationCap className="size-5 text-muted-foreground" />
            Education
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addEducation}>
            <Plus className="size-4 mr-1" /> Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 space-y-6">
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className="border rounded-lg p-4 space-y-4 bg-card relative"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <GripVertical className="size-4" />
              <span className="text-sm font-medium">Education {index + 1}</span>
              {education.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto size-7"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Degree *</Label>
                <Input
                  placeholder="B.S. Computer Science"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, { degree: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Institution *</Label>
                <Input
                  placeholder="Stanford University"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(edu.id, { institution: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Stanford, CA"
                  value={edu.location}
                  onChange={(e) =>
                    updateEducation(edu.id, { location: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    placeholder="Sep 2014"
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(edu.id, { startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    placeholder="Jun 2018"
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(edu.id, { endDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Honors / GPA (optional)</Label>
              <Input
                placeholder="Magna Cum Laude, GPA: 3.8/4.0"
                value={edu.honors}
                onChange={(e) =>
                  updateEducation(edu.id, { honors: e.target.value })
                }
              />
            </div>
          </div>
        ))}
      </CardContent>
    </div>
  );
}
