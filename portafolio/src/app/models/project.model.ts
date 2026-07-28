export interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  videoUrl?: string;
  details: ProjectDetails;
  featured: boolean;
}

export interface ProjectDetails {
  architecture: string;
  challenges: string;
  solutions: string;
  role: string;
  duration: string;
}

export type ProjectCategory = 'all' | 'web' | 'mobile' | 'backend' | 'distributed';

export interface ProjectCategoryInfo {
  key: ProjectCategory;
  label: string;
  icon: string;
}
