import { Injectable } from '@angular/core';
import { Skill, SkillCategory, SkillCategoryInfo, SkillStats, ContributionYear } from '../models/skill.model';

@Injectable({ providedIn: 'root' })
export class SkillsService {
  categories: SkillCategoryInfo[] = [
    { key: 'frontend', label: 'Frontend', color: '#8B5CF6' },
    { key: 'backend', label: 'Backend', color: '#7C3AED' },
    { key: 'database', label: 'Bases de Datos', color: '#6D28D9' },
    { key: 'tools', label: 'Herramientas', color: '#5B21B6' },
    { key: 'mobile', label: 'Mobile', color: '#4C1D95' }
  ];

  private mockSkills: Skill[] = [
    { name: 'Angular', level: 95, category: 'frontend', icon: '🅰️' },
    { name: 'TypeScript', level: 92, category: 'frontend', icon: '📘' },
    { name: 'RxJS', level: 88, category: 'frontend', icon: '🔄' },
    { name: 'Tailwind CSS', level: 90, category: 'frontend', icon: '🎨' },
    { name: 'React', level: 78, category: 'frontend', icon: '⚛️' },
    { name: 'Vue.js', level: 70, category: 'frontend', icon: '💚' },
    { name: 'HTML/CSS', level: 95, category: 'frontend', icon: '🌐' },
    { name: 'Node.js', level: 85, category: 'backend', icon: '🟢' },
    { name: 'NestJS', level: 82, category: 'backend', icon: '🐱' },
    { name: 'Express.js', level: 88, category: 'backend', icon: '🚀' },
    { name: 'Python', level: 75, category: 'backend', icon: '🐍' },
    { name: 'Java', level: 68, category: 'backend', icon: '☕' },
    { name: 'GraphQL', level: 78, category: 'backend', icon: '◆' },
    { name: 'PostgreSQL', level: 85, category: 'database', icon: '🐘' },
    { name: 'MongoDB', level: 88, category: 'database', icon: '🍃' },
    { name: 'Redis', level: 75, category: 'database', icon: '🔴' },
    { name: 'Docker', level: 82, category: 'tools', icon: '🐳' },
    { name: 'Git', level: 92, category: 'tools', icon: '📦' },
    { name: 'CI/CD', level: 80, category: 'tools', icon: '⚙️' },
    { name: 'AWS', level: 72, category: 'tools', icon: '☁️' },
    { name: 'Flutter', level: 70, category: 'mobile', icon: '📱' },
    { name: 'Ionic', level: 85, category: 'mobile', icon: '⚡' },
  ];

  private mockContributions: ContributionYear[] = [
    { year: 2021, projects: 5, commits: 342, contributions: 456 },
    { year: 2022, projects: 8, commits: 567, contributions: 723 },
    { year: 2023, projects: 12, commits: 891, contributions: 1104 },
    { year: 2024, projects: 15, commits: 1234, contributions: 1567 },
    { year: 2025, projects: 18, commits: 1567, contributions: 1890 },
    { year: 2026, projects: 10, commits: 890, contributions: 1023 },
  ];

  getSkills(): Skill[] {
    return this.mockSkills;
  }

  getSkillsByCategory(category: SkillCategory): Skill[] {
    if (category === 'frontend') return this.mockSkills.filter(s => s.category === category);
    if (category === 'backend') return this.mockSkills.filter(s => s.category === category);
    if (category === 'database') return this.mockSkills.filter(s => s.category === category);
    if (category === 'tools') return this.mockSkills.filter(s => s.category === category);
    if (category === 'mobile') return this.mockSkills.filter(s => s.category === category);
    return this.mockSkills;
  }

  getContributions(): ContributionYear[] {
    return this.mockContributions;
  }

  getStats(): SkillStats {
    return {
      skills: this.mockSkills,
      contributions: this.mockContributions
    };
  }
}
