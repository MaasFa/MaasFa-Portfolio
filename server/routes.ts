import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.certifications.list.path, async (_req, res) => {
    const certifications = await storage.getCertifications();
    res.json(certifications);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Seed data if empty
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  // Always reset and re-seed on startup to reflect latest changes
  await storage.reset();

  // ── SKILLS ─────────────────────────────────────────────────────────────────
  // Languages
  const skills = [
    { name: "Python", category: "Languages", proficiency: 95, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "SQL (MySQL)", category: "Languages", proficiency: 85, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },

    // Tools / Platforms
    { name: "Jupyter Notebook", category: "Tools / Platforms", proficiency: 90, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
    { name: "Git", category: "Tools / Platforms", proficiency: 85, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", category: "Tools / Platforms", proficiency: 85, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "HuggingFace", category: "Tools / Platforms", proficiency: 80, iconUrl: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
    { name: "Gradio", category: "Tools / Platforms", proficiency: 75, iconUrl: "https://www.svgrepo.com/show/306453/gradio.svg" },
    { name: "Tableau", category: "Tools / Platforms", proficiency: 75, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-icon-original.svg" },

    // ML / DL Libraries
    { name: "PyTorch", category: "ML / DL Libraries", proficiency: 75, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "Scikit-learn", category: "ML / DL Libraries", proficiency: 82, iconUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
    { name: "LangChain", category: "ML / DL Libraries", proficiency: 70, iconUrl: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
    { name: "Transformers", category: "ML / DL Libraries", proficiency: 78, iconUrl: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
    { name: "BERT", category: "ML / DL Libraries", proficiency: 75, iconUrl: "https://cdn-icons-png.flaticon.com/512/4341/4341160.png" },
    { name: "GPT-2", category: "ML / DL Libraries", proficiency: 72, iconUrl: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png" },
    { name: "Pandas", category: "ML / DL Libraries", proficiency: 92, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "NumPy", category: "ML / DL Libraries", proficiency: 88, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "Matplotlib", category: "ML / DL Libraries", proficiency: 90, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" },
    { name: "Seaborn", category: "ML / DL Libraries", proficiency: 85, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/plotly/plotly-original.svg" },
  ];
  for (const skill of skills) await storage.createSkill(skill);

  // ── PROJECTS (all repos from https://github.com/MaasFa) ───────────────────
  const projects = [
    {
      title: "COVID-19 & District Crime Data Analysis",
      description: "Applied data science techniques to COVID-19 and District Crime datasets using Python. Conducted EDA, visualization, and forecasting to uncover trends, patterns, and insights supporting data-driven conclusions in public health and safety.",
      technologies: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter"],
      link: "https://github.com/MaasFa/Data-Science-Project-",
      imageUrl: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "AI Developer Productivity Analysis",
      description: "End-to-end data science project on an AI developer productivity dataset. Performed EDA, feature engineering, model training, and evaluation to assess the impact of AI tools on developer performance.",
      technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Jupyter"],
      link: "https://github.com/MaasFa/Data-Science-Project-2",
      imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Fake News Generator & Detection",
      description: "GPT-2 generates fake news articles while BERT detects whether news is real or fake. Includes a Gradio-based web interface and a URL scraping feature to analyze news directly from online sources.",
      technologies: ["Python", "GPT-2", "BERT", "HuggingFace", "Gradio", "NLP"],
      link: "https://github.com/MaasFa/Fake-News-Generator-Detection",
      demoLink: "https://huggingface.co/spaces/Maasfa/Fake-News-Generator-Detection",
      imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Gemini Chatbot",
      description: "A conversational AI chatbot built with Google's Gemini Flash 2.5 model. Demonstrates integration of cutting-edge LLM capabilities into an interactive chat interface.",
      technologies: ["Python", "Gemini API", "LLM", "Jupyter"],
      link: "https://github.com/MaasFa/gemini_chatbot",
      imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Sentiment Analysis Live ML App",
      description: "Real-time sentiment analysis web app classifying any sentence as POSITIVE or NEGATIVE. Built with HuggingFace Transformers for state-of-the-art NLP results without custom model training.",
      technologies: ["Python", "HuggingFace", "Transformers", "NLP", "Gradio"],
      link: "https://github.com/MaasFa/sentiment-analysis-live-ML-App",
      imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Sentiment Analysis (Research)",
      description: "Research-focused sentiment analysis project exploring NLP techniques and text classification methodologies. Foundation work for building production-ready sentiment models.",
      technologies: ["Python", "NLP", "Transformers", "Jupyter"],
      link: "https://github.com/MaasFa/sentiment-analysis",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Rainwater Harvesting System (SIH)",
      description: "Smart India Hackathon (SIH) project on rainwater harvesting solutions. Built an informational web platform showcasing sustainable water management strategies and IoT integration concepts.",
      technologies: ["HTML", "CSS", "JavaScript"],
      link: "https://github.com/MaasFa/rainwater_harvesting_sih",
      imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop"
    }
  ];
  for (const project of projects) await storage.createProject(project);

  // ── CERTIFICATIONS & VIRTUAL EXPERIENCE ─────────────────────────────────────
  const certs = [
    { name: "BCG X Data Science Job Simulation", issuer: "Forage", date: "Feb 2026", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" },
    { name: "Deloitte Data Analytics Job Simulation", issuer: "Forage", date: "Jul 2025", imageUrl: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=800&auto=format&fit=crop" },
    { name: "IBM PBEL Generative AI Project Program", issuer: "IBM Virtual Internship", date: "Feb–Mar 2026", imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800&auto=format&fit=crop" },
    { name: "Getting Started with Artificial Intelligence", issuer: "IBM SkillsBuild", date: "Nov 2024", imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop" },
    { name: "Intro to SQL", issuer: "Kaggle", date: "Oct 2025", imageUrl: "https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=800&auto=format&fit=crop" },
    { name: "AI for Impact APAC Hackathon 2024", issuer: "Google Cloud × Hack2Skill", date: "2024", imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop" },
  ];
  for (const cert of certs) await storage.createCertification(cert);
}

