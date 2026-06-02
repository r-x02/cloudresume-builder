"use client";

import { useResumeStore } from "@/store/resume-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Briefcase,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";

export function ExperienceSection() {
  const experience = useResumeStore((s) => s.experience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);
  const addExperienceBullet = useResumeStore((s) => s.addExperienceBullet);
  const updateExperienceBullet = useResumeStore((s) => s.updateExperienceBullet);
  const removeExperienceBullet = useResumeStore((s) => s.removeExperienceBullet);

  return (
    <div className="space-y-4">
      <CardHeader className="p-0 pt-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase className="size-5 text-muted-foreground" />
            Work Experience
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addExperience}>
            <Plus className="size-4 mr-1" /> Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 space-y-6">
        {experience.map((exp, index) => (
          <div
            key={exp.id}
            className="border rounded-lg p-4 space-y-4 bg-card relative"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <GripVertical className="size-4" />
              <span className="text-sm font-medium">Position {index + 1}</span>
              {experience.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto size-7"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Title *</Label>
                <Input
                  placeholder="Senior Cloud Engineer"
                  value={exp.jobTitle}
                  onChange={(e) =>
                    updateExperience(exp.id, { jobTitle: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Company *</Label>
                <Input
                  placeholder="Amazon Web Services"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(exp.id, { company: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Seoul, South Korea"
                  value={exp.location}
                  onChange={(e) =>
                    updateExperience(exp.id, { location: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    placeholder="Jan 2020"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, { startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    placeholder="Present"
                    value={exp.endDate}
                    disabled={exp.current}
                    onChange={(e) =>
                      updateExperience(exp.id, { endDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id={`current-${exp.id}`}
                checked={exp.current}
                onCheckedChange={(checked) =>
                  updateExperience(exp.id, {
                    current: checked === true,
                    endDate: checked === true ? "Present" : "",
                  })
                }
              />
              <Label htmlFor={`current-${exp.id}`} className="text-sm">
                Currently working here
              </Label>
            </div>

            <div className="space-y-3">
              <Label>Key Achievements & Responsibilities</Label>
              {exp.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex gap-2">
                  <span className="text-muted-foreground mt-2 text-sm select-none">
                    &bull;
                  </span>
                  <Textarea
                    placeholder="Architected and deployed a multi-region AWS infrastructure handling 10M+ daily requests with 99.99% uptime"
                    className="min-h-[60px] resize-y text-sm"
                    value={bullet}
                    onChange={(e) =>
                      updateExperienceBullet(
                        exp.id,
                        bulletIndex,
                        e.target.value
                      )
                    }
                  />
                  {exp.bullets.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0"
                      onClick={() =>
                        removeExperienceBullet(exp.id, bulletIndex)
                      }
                    >
                      <Trash2 className="size-3.5 text-muted-foreground" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => addExperienceBullet(exp.id)}
              >
                <Plus className="size-3.5 mr-1" /> Add bullet point
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </div>
  );
}
