import {
  type InsertSkill, type InsertProject, type InsertCertification, type InsertMessage,
  type Skill, type Project, type Certification, type Message
} from "@shared/schema";

export interface IStorage {
  getSkills(): Promise<Skill[]>;
  getProjects(): Promise<Project[]>;
  getCertifications(): Promise<Certification[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  reset(): Promise<void>;

  // Seeding methods
  createSkill(skill: InsertSkill): Promise<Skill>;
  createProject(project: InsertProject): Promise<Project>;
  createCertification(cert: InsertCertification): Promise<Certification>;
}

export class MemStorage implements IStorage {
  private skills: Skill[] = [];
  private projects: Project[] = [];
  private certifications: Certification[] = [];
  private messages: Message[] = [];
  private idCounts = {
    skills: 1,
    projects: 1,
    certifications: 1,
    messages: 1,
  };

  async reset(): Promise<void> {
    this.skills = [];
    this.projects = [];
    this.certifications = [];
    this.idCounts = { skills: 1, projects: 1, certifications: 1, messages: 1 };
  }

  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getCertifications(): Promise<Certification[]> {
    return this.certifications;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const id = this.idCounts.messages++;
    // ensure createdAt is a Date if strictly typed, but shared schema says defaultNow() which implies Date
    // In InsertMessage it is omitted. In Message it is timestamp.
    // timestamp in drizzle returns Date.
    const newMessage: Message = {
      ...message,
      id,
      createdAt: new Date()
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const id = this.idCounts.skills++;
    // proficiency defaults to 0 in schema, but might be number | null.
    // InsertSkill might have it optional.
    const newSkill: Skill = {
      proficiency: 0, // default
      ...skill,
      id,
      iconUrl: skill.iconUrl ?? null
    };
    this.skills.push(newSkill);
    return newSkill;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.idCounts.projects++;
    const newProject: Project = {
      ...project,
      id,
      technologies: project.technologies ?? null,
      link: project.link ?? null,
      demoLink: project.demoLink ?? null,
      imageUrl: project.imageUrl ?? null
    };
    this.projects.push(newProject);
    return newProject;
  }

  async createCertification(cert: InsertCertification): Promise<Certification> {
    const id = this.idCounts.certifications++;
    const newCert: Certification = {
      ...cert,
      id,
      date: cert.date ?? null,
      link: cert.link ?? null,
      imageUrl: cert.imageUrl ?? null
    };
    this.certifications.push(newCert);
    return newCert;
  }
}

export const storage = new MemStorage();
