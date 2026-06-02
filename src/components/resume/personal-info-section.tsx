"use client";

import { useResumeStore } from "@/store/resume-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Github,
} from "lucide-react";

export function PersonalInfoSection() {
  const personalInfo = useResumeStore((s) => s.personalInfo);
  const setPersonalInfo = useResumeStore((s) => s.setPersonalInfo);

  return (
    <div className="space-y-4">
      <CardHeader className="p-0 pt-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="size-5 text-muted-foreground" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="Charles Bloomberg"
              value={personalInfo.fullName}
              onChange={(e) =>
                setPersonalInfo({ fullName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              id="jobTitle"
              placeholder="Senior Cloud Engineer"
              value={personalInfo.jobTitle}
              onChange={(e) =>
                setPersonalInfo({ jobTitle: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Seoul, South Korea"
                className="pl-9"
                value={personalInfo.location}
                onChange={(e) =>
                  setPersonalInfo({ location: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="charles@example.com"
                className="pl-9"
                value={personalInfo.email}
                onChange={(e) =>
                  setPersonalInfo({ email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="+82-10-1234-5678"
                className="pl-9"
                value={personalInfo.phone}
                onChange={(e) =>
                  setPersonalInfo({ phone: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="linkedin"
                placeholder="linkedin.com/in/charlesbloomberg"
                className="pl-9"
                value={personalInfo.linkedin}
                onChange={(e) =>
                  setPersonalInfo({ linkedin: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="github"
                placeholder="github.com/charlesbloomberg"
                className="pl-9"
                value={personalInfo.github}
                onChange={(e) =>
                  setPersonalInfo({ github: e.target.value })
                }
              />
            </div>
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="website">Website / Portfolio</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="website"
                placeholder="www.charlesbloomberg.dev"
                className="pl-9"
                value={personalInfo.website}
                onChange={(e) =>
                  setPersonalInfo({ website: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
