"use client";

import { useResumeStore } from "@/store/resume-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FolderGit2, Plus, Trash2, GripVertical } from "lucide-react";

export function ProjectsSection() {
  const projects = useResumeStore((s) => s.projects);
  const addProject = useResumeStore((s) => s.addProject);
  const updateProject = useResumeStore((s) => s.updateProject);
  const removeProject = useResumeStore((s) => s.removeProject);

  return (
    <div className="space-y-4">
      <CardHeader className="p-0 pt-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FolderGit2 className="size-5 text-muted-foreground" />
            Projects
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addProject}>
            <Plus className="size-4 mr-1" /> Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 space-y-6">
        {projects.map((proj, index) => (
          <div
            key={proj.id}
            className="border rounded-lg p-4 space-y-4 bg-card relative"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <GripVertical className="size-4" />
              <span className="text-sm font-medium">Project {index + 1}</span>
              {projects.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto size-7"
                  onClick={() => removeProject(proj.id)}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Project Name *</Label>
                <Input
                  placeholder="Cloud Infrastructure Automation Tool"
                  value={proj.name}
                  onChange={(e) =>
                    updateProject(proj.id, { name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <Input
                  placeholder="AWS Lambda, Terraform, Python, Docker"
                  value={proj.technologies}
                  onChange={(e) =>
                    updateProject(proj.id, { technologies: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Project Link (optional)</Label>
                <Input
                  placeholder="github.com/yourname/project"
                  value={proj.link}
                  onChange={(e) =>
                    updateProject(proj.id, { link: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    placeholder="Jan 2023"
                    value={proj.startDate}
                    onChange={(e) =>
                      updateProject(proj.id, { startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    placeholder="Present"
                    value={proj.endDate}
                    onChange={(e) =>
                      updateProject(proj.id, { endDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe the project, your role, key features, and impact. Focus on measurable outcomes and technologies used."
                className="min-h-[80px] resize-y text-sm"
                value={proj.description}
                onChange={(e) =>
                  updateProject(proj.id, { description: e.target.value })
                }
              />
            </div>
          </div>
        ))}
      </CardContent>
    </div>
  );
}
