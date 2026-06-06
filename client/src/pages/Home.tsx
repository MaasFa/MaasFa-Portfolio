import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSkills, useProjects, useCertifications, useContactForm } from "@/hooks/use-portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillBar } from "@/components/SkillBar";
import { SectionHeading } from "@/components/SectionHeading";
import { Github, Linkedin, Mail, Download, ArrowRight, Database, BarChart3, BrainCircuit, Terminal, Code2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Link as ScrollLink } from "react-scroll";

export default function Home() {
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: certifications, isLoading: certsLoading } = useCertifications();
  const contactMutation = useContactForm();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    const cat = skill.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/10">
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -z-10" />

        <div className="container max-w-7xl px-6 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">

            <motion.div
              className="flex-1 text-center lg:text-left"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground font-medium text-sm mb-4">
                  Available for Hire
                </span>
                <h1 className="text-5xl lg:text-7xl font-display font-bold text-foreground mb-4 leading-tight">
                  Hi, I'm <br />
                  <span className="text-gradient">Maasfa Khan</span>
                </h1>
              </motion.div>

              <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Data Science & AI enthusiast — building intelligent systems with Python, Machine Learning, NLP, and LLMs. Turning complex datasets into compelling stories and real-world solutions.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <ScrollLink to="projects" smooth={true} offset={-80}>
                  <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 rounded-full shadow-lg shadow-primary/20">
                    View Projects <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </ScrollLink>
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 px-8 rounded-full border-2 hover:bg-secondary/50" onClick={() => window.open("https://drive.google.com/file/d/1MznyPeb0MDQ8Fx7QVTCctvL4geXjQULo/view?usp=drive_link", "_blank")}>
                  Download Resume <Download className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-muted-foreground">
                <a href="https://github.com/MaasFa" className="hover:text-primary transition-colors hover:scale-110 transform duration-200"><Github className="w-6 h-6" /></a>
                <a href="https://linkedin.com/in/maasfakhan" className="hover:text-primary transition-colors hover:scale-110 transform duration-200"><Linkedin className="w-6 h-6" /></a>
                <a href="mailto:khanmasfah@gmail.com" className="hover:text-primary transition-colors hover:scale-110 transform duration-200"><Mail className="w-6 h-6" /></a>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Abstract Data Viz Graphic */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-[2rem] rotate-6 opacity-20 blur-xl" />
                <div className="absolute inset-0 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-border flex items-center justify-center">
                  {/* Placeholder for Profile Image or abstract graphic */}
                  {/* Using an Unsplash placeholder with data theme */}
                  {/* data science abstract visualization */}
                  <img
                    src="/profile.png.png"
                    alt="Maasfa Khan Profile"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Floating Cards */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-border flex items-center gap-3"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <div className="bg-green-100 p-2 rounded-lg text-green-600">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">PYTHON/SQL Expert</div>
                    <div className="text-xs text-muted-foreground">Data Management</div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-border flex items-center gap-3"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                >
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Machine Learning</div>
                    <div className="text-xs text-muted-foreground">Predictive Models</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-secondary/30">
        <div className="container max-w-4xl px-6 mx-auto text-center">
          <SectionHeading title="About Me" subtitle="A passion for discovering patterns in chaos." />
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            I'm a 3rd-year B.Tech student in Computer Science & Technology with a passion for Data Science and AI.
            I build end-to-end ML pipelines, NLP systems (GPT-2, BERT, HuggingFace), and data-driven web apps.
            From forecasting COVID trends to detecting fake news with Transformers — I love turning complex data into impactful solutions.
          </p>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 bg-background">
        <div className="container max-w-7xl px-6 mx-auto">
          <SectionHeading title="Featured Projects" subtitle="Real-world applications of data science & AI." />

          {projectsLoading ? (
            <div className="text-center">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="rounded-full px-8" onClick={() => window.open("https://github.com/MaasFa", "_blank")}>
              <Github className="mr-2 w-4 h-4" /> View More on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certifications" className="py-24 bg-secondary/30">
        <div className="container max-w-5xl px-6 mx-auto">
          <SectionHeading title="Certifications & Virtual Experience" subtitle="Continuous learning and professional development." />

          {certsLoading ? (
            <div className="text-center">Loading certifications...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications?.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative h-64 w-full perspective-1000 cursor-pointer"
                >
                  <div className="absolute inset-0 w-full h-full rounded-2xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front Face */}
                    <div className="absolute inset-0 w-full h-full bg-white rounded-2xl overflow-hidden backface-hidden flex items-center justify-center border border-gray-100">
                      {cert.imageUrl ? (
                        <div className="relative w-full h-full">
                          <img
                            src={cert.imageUrl}
                            alt={cert.name}
                            className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <h3 className="text-white text-xl font-bold font-display text-center px-4 drop-shadow-md">{cert.name}</h3>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-primary/5 p-6 w-full h-full flex flex-col items-center justify-center text-center">
                          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                            <img src="https://cdn-icons-png.flaticon.com/512/2912/2912761.png" alt="Badge" className="w-12 h-12 opacity-80" />
                          </div>
                          <h3 className="text-lg font-bold font-display text-foreground">{cert.name}</h3>
                        </div>
                      )}
                    </div>

                    {/* Back Face */}
                    <div className="absolute inset-0 w-full h-full bg-primary text-primary-foreground rounded-2xl p-6 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <h4 className="text-xl font-bold mb-1">{cert.issuer}</h4>
                      <p className="text-sm opacity-90 mb-3 font-medium">{cert.date}</p>
                      {(cert as any).description && (
                        <p className="text-xs opacity-80 mb-3 leading-relaxed">{(cert as any).description}</p>
                      )}

                      {cert.link && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="rounded-full font-semibold hover:scale-105 transition-transform"
                          onClick={() => window.open(cert.link!, "_blank")}
                        >
                          View Credential <ExternalLink className="w-3 h-3 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 bg-background">
        <div className="container max-w-6xl px-6 mx-auto">
          <SectionHeading title="Technical Skills" subtitle="My toolkit for data science and AI." />

          {skillsLoading ? (
            <div className="text-center">Loading skills...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {skills?.map((skill, idx) => (
                <div
                  key={skill.id}
                  className="group relative h-40 w-full perspective-1000 cursor-pointer"
                >
                  <div className="absolute inset-0 w-full h-full rounded-xl shadow-md hover:shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front Face */}
                    <div className="absolute inset-0 w-full h-full bg-white rounded-xl flex flex-col items-center justify-center p-4 border border-gray-100 backface-hidden">
                      {skill.iconUrl ? (
                        <div className="w-16 h-16 mb-3 relative flex items-center justify-center">
                          <img src={skill.iconUrl} alt={skill.name} className="w-full h-full object-contain transition-all duration-500" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 mb-3 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <Code2 className="w-8 h-8" />
                        </div>
                      )}
                      <h3 className="font-bold text-sm text-center text-foreground">{skill.name}</h3>
                    </div>

                    {/* Back Face */}
                    <div className="absolute inset-0 w-full h-full bg-primary text-primary-foreground rounded-xl p-4 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <div className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">{skill.category}</div>
                      <div className="w-full bg-primary-foreground/30 h-2 rounded-full overflow-hidden mb-2">
                        <div className="bg-white h-full" style={{ width: `${skill.proficiency}%` }} />
                      </div>
                      <span className="text-sm font-bold">{skill.proficiency}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="container max-w-4xl px-6 mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Let's Work Together</h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Open to opportunities in Data Science, AI/ML & Software Engineering. Have a question or want to discuss a project/ job?
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl text-center">
            <h3 className="text-2xl font-semibold mb-4 text-white">Get In Touch</h3>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-lg mx-auto">
              For more details, inquiries, or to discuss potential opportunities, please feel free to contact me directly via email.
            </p>
            <a href="mailto:khanmasfah@gmail.com">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold text-lg h-14 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <Mail className="w-5 h-5 mr-2" />
                khanmasfah@gmail.com
              </Button>
            </a>
          </div>

          <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8 text-sm text-primary-foreground/60">
            <a href="mail to: khanmasfah@gmail.com" className="flex items-center hover:text-white transition-colors">
              <Mail className="w-5 h-5 mr-2" /> khanmasfah@gmail.com
            </a>
            <a href="https://linkedin.com/in/maasfakhan" target="_blank" rel="noreferrer" className="flex items-center hover:text-white transition-colors">
              <Linkedin className="w-5 h-5 mr-2" /> LinkedIn Profile
            </a>
            <a href="https://github.com/MaasFa" target="_blank" rel="noreferrer" className="flex items-center hover:text-white transition-colors">
              <Github className="w-5 h-5 mr-2" /> GitHub Profile
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background py-8 border-t border-border">
        <div className="container px-6 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Maasfa Khan. All rights reserved.</p>
          <p className="mt-2 text-xs">;)</p>
        </div>
      </footer>
    </div>
  );
}
