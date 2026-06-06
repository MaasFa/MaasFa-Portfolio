import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 bg-white h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary/30 text-primary/20">
             {/* Abstract pattern placeholder if no image */}
             <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div className="flex gap-2">
            {project.link && (
              <Button size="sm" variant="secondary" className="h-8 px-3 text-xs" onClick={() => window.open(project.link!, '_blank')}>
                <Github className="w-3.5 h-3.5 mr-1.5" /> Code
              </Button>
            )}
            {project.demoLink && (
              <Button size="sm" className="h-8 px-3 text-xs" onClick={() => window.open(project.demoLink!, '_blank')}>
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Demo
              </Button>
            )}
          </div>
        </div>
      </div>

      <CardHeader className="p-6 pb-2">
        <h3 className="text-xl font-bold text-foreground font-display group-hover:text-primary transition-colors">
          {project.title}
        </h3>
      </CardHeader>
      
      <CardContent className="p-6 pt-2 flex-grow">
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary" 
              className="font-medium text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
