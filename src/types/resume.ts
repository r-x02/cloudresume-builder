export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  github: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  honors: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  certifications: string;
}
