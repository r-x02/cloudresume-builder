"use client";

import { useResumeStore } from "@/store/resume-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Wrench,
  Plus,
  Trash2,
  Award,
} from "lucide-react";

export function SkillsSection() {
  const skills = useResumeStore((s) => s.skills);
  const certifications = useResumeStore((s) => s.certifications);
  const addSkill = useResumeStore((s) => s.addSkill);
  const updateSkill = useResumeStore((s) => s.updateSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);
  const setCertifications = useResumeStore((s) => s.setCertifications);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <CardHeader className="p-0 pt-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wrench className="size-5 text-muted-foreground" />
              Skills
            </CardTitle>
            <Button variant="outline" size="sm" onClick={addSkill}>
              <Plus className="size-4 mr-1" /> Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="space-y-2 md:col-span-1">
                <Label>Category</Label>
                <Input
                  placeholder="Cloud Platforms"
                  value={skill.category}
                  onChange={(e) =>
                    updateSkill(skill.id, { category: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Skills (comma-separated)</Label>
                <Input
                  placeholder="AWS, Azure, GCP, Oracle Cloud"
                  value={skill.skills}
                  onChange={(e) =>
                    updateSkill(skill.id, { skills: e.target.value })
                  }
                />
              </div>
              <div className="flex items-end">
                {skills.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9"
                    onClick={() => removeSkill(skill.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            Organize skills by category. Use comma-separated lists for each category. ATS systems parse these easily.
          </p>
        </CardContent>
      </div>

      <div className="space-y-4">
        <CardHeader className="p-0">
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="size-5 text-muted-foreground" />
            Certifications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-3">
          <div className="space-y-2">
            <Label htmlFor="certifications">
              List your cloud certifications (one per line)
            </Label>
            <Textarea
              id="certifications"
              placeholder="AWS Solutions Architect Professional&#10;Google Professional Cloud Architect&#10;Certified Kubernetes Administrator (CKA)&#10;HashiCorp Certified Terraform Associate"
              className="min-h-[100px] resize-y"
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
            />
          </div>
        </CardContent>
      </div>
    </div>
  );
}
