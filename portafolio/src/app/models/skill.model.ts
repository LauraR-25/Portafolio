export interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
  icon: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'mobile';

export interface SkillCategoryInfo {
  key: SkillCategory;
  label: string;
  color: string;
}

export interface ContributionYear {
  year: number;
  projects: number;
  commits: number;
  contributions: number;
}

export interface SkillStats {
  skills: Skill[];
  contributions: ContributionYear[];
}
