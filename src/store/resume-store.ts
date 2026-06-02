import { create } from "zustand";
import type {
  ResumeData,
  PersonalInfo,
  WorkExperience,
  Education,
  SkillCategory,
} from "@/types/resume";

function uid(): string {
  return crypto.randomUUID().slice(0, 8);
}

const defaultPersonalInfo: PersonalInfo = {
  fullName: "",
  jobTitle: "Cloud Engineer",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  website: "",
  github: "",
};

const defaultExperience: WorkExperience[] = [
  {
    id: uid(),
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    bullets: [""],
  },
];

const defaultEducation: Education[] = [
  {
    id: uid(),
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    honors: "",
  },
];

const defaultSkills: SkillCategory[] = [
  { id: uid(), category: "Cloud Platforms", skills: "" },
  { id: uid(), category: "DevOps & CI/CD", skills: "" },
  { id: uid(), category: "Programming", skills: "" },
  { id: uid(), category: "Containers & Orchestration", skills: "" },
];

const defaultState: ResumeData = {
  personalInfo: defaultPersonalInfo,
  summary: "",
  experience: defaultExperience,
  education: defaultEducation,
  skills: defaultSkills,
  certifications: "",
};

interface ResumeStore extends ResumeData {
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  setSummary: (summary: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<WorkExperience>) => void;
  removeExperience: (id: string) => void;
  addExperienceBullet: (id: string) => void;
  updateExperienceBullet: (id: string, index: number, value: string) => void;
  removeExperienceBullet: (id: string, index: number) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<SkillCategory>) => void;
  removeSkill: (id: string) => void;
  setCertifications: (certifications: string) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  ...defaultState,

  setPersonalInfo: (info) =>
    set((s) => ({ personalInfo: { ...s.personalInfo, ...info } })),

  setSummary: (summary) => set({ summary }),

  addExperience: () =>
    set((s) => ({
      experience: [
        ...s.experience,
        { id: uid(), jobTitle: "", company: "", location: "", startDate: "", endDate: "", current: false, bullets: [""] },
      ],
    })),

  updateExperience: (id, data) =>
    set((s) => ({
      experience: s.experience.map((e) => (e.id === id ? { ...e, ...data } : e)),
    })),

  removeExperience: (id) =>
    set((s) => ({
      experience: s.experience.filter((e) => e.id !== id),
    })),

  addExperienceBullet: (id) =>
    set((s) => ({
      experience: s.experience.map((e) =>
        e.id === id ? { ...e, bullets: [...e.bullets, ""] } : e
      ),
    })),

  updateExperienceBullet: (id, index, value) =>
    set((s) => ({
      experience: s.experience.map((e) =>
        e.id === id
          ? { ...e, bullets: e.bullets.map((b, i) => (i === index ? value : b)) }
          : e
      ),
    })),

  removeExperienceBullet: (id, index) =>
    set((s) => ({
      experience: s.experience.map((e) =>
        e.id === id
          ? { ...e, bullets: e.bullets.filter((_, i) => i !== index) }
          : e
      ),
    })),

  addEducation: () =>
    set((s) => ({
      education: [
        ...s.education,
        { id: uid(), degree: "", institution: "", location: "", startDate: "", endDate: "", honors: "" },
      ],
    })),

  updateEducation: (id, data) =>
    set((s) => ({
      education: s.education.map((e) => (e.id === id ? { ...e, ...data } : e)),
    })),

  removeEducation: (id) =>
    set((s) => ({
      education: s.education.filter((e) => e.id !== id),
    })),

  addSkill: () =>
    set((s) => ({
      skills: [...s.skills, { id: uid(), category: "", skills: "" }],
    })),

  updateSkill: (id, data) =>
    set((s) => ({
      skills: s.skills.map((sk) => (sk.id === id ? { ...sk, ...data } : sk)),
    })),

  removeSkill: (id) =>
    set((s) => ({
      skills: s.skills.filter((sk) => sk.id !== id),
    })),

  setCertifications: (certifications) => set({ certifications }),

  resetResume: () => set(defaultState),
}));
