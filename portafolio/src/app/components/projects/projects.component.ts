import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';
import { ProjectCategory } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="proyectos" class="py-16 md:py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="section-title">Todos los <span class="gradient-text">Proyectos</span></h2>
          <p class="section-subtitle">Explora mi trabajo organizado por categorias</p>
        </div>

        <div class="flex flex-wrap justify-center gap-2 mb-12">
          @for (cat of categories; track cat.key) {
            <button (click)="selectCategory(cat.key)"
                    [class]="activeCategory() === cat.key
                      ? 'bg-violet-600 text-white shadow-glass'
                      : 'bg-white text-gray-600 hover:text-violet-600 hover:bg-violet-50 shadow-sm'"
                    class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-gray-100 transition-all duration-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="cat.icon"/>
              </svg>
              {{ cat.label }}
            </button>
          }
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (project of filteredProjects(); track project.id; let i = $index) {
            <div class="card overflow-hidden animate-slide-up" [style.animation-delay]="(i * 0.1) + 's'">
              <div class="relative h-48 overflow-hidden">
                <img [src]="project.image" [alt]="project.title" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                <div class="absolute top-3 right-3">
                  <span class="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-violet-600 text-xs font-semibold shadow-sm">{{ getCategoryLabel(project.category) }}</span>
                </div>
              </div>

              <div class="p-6">
                <h3 class="text-lg font-bold text-violet-950 mb-2">{{ project.title }}</h3>
                <p class="text-sm text-gray-500 mb-4 line-clamp-2">{{ project.description }}</p>

                <div class="flex flex-wrap gap-1.5 mb-4">
                  @for (tech of project.technologies.slice(0, 3); track tech) {
                    <span class="px-2 py-0.5 rounded-md bg-violet-50 text-violet-600 text-xs font-medium">{{ tech }}</span>
                  }
                  @if (project.technologies.length > 3) {
                    <span class="px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 text-xs font-medium">+{{ project.technologies.length - 3 }}</span>
                  }
                </div>

                <button (click)="toggleDetails(project.id)"
                        class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-50 text-sm font-medium text-violet-600 hover:bg-violet-50 transition-colors duration-200 mb-3">
                  <span>Detalles del proyecto</span>
                  <svg class="w-4 h-4 transition-transform duration-300" [class.rotate-180]="expandedProject() === project.id" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                @if (expandedProject() === project.id) {
                  <div class="animate-slide-up border-t border-gray-100 pt-4 space-y-3">
                    <div>
                      <h4 class="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-1">Arquitectura</h4>
                      <p class="text-xs text-gray-500">{{ project.details.architecture }}</p>
                    </div>
                    <div>
                      <h4 class="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-1">Retos</h4>
                      <p class="text-xs text-gray-500">{{ project.details.challenges }}</p>
                    </div>
                    <div>
                      <h4 class="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-1">Soluciones</h4>
                      <p class="text-xs text-gray-500">{{ project.details.solutions }}</p>
                    </div>
                    <div class="flex items-center gap-4 text-xs text-gray-400 pt-2">
                      <span class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        {{ project.details.role }}
                      </span>
                      <span class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {{ project.details.duration }}
                      </span>
                    </div>
                  </div>
                }

                <div class="flex items-center gap-2 pt-2">
                  <a [href]="project.githubUrl" target="_blank" rel="noopener noreferrer"
                     class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-colors">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    Codigo
                  </a>
                  @if (project.liveUrl) {
                    <a [href]="project.liveUrl" target="_blank" rel="noopener noreferrer"
                       class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600 text-white text-xs font-medium hover:bg-violet-700 transition-colors">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      Demo
                    </a>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class ProjectsComponent {
  activeCategory = signal<ProjectCategory>('all');
  expandedProject = signal<number | null>(null);

  private projectsService = inject(ProjectsService);
  categories = this.projectsService.categories;

  filteredProjects = computed(() => {
    return this.projectsService.getProjectsByCategory(this.activeCategory());
  });

  constructor() {}

  selectCategory(category: ProjectCategory): void {
    this.activeCategory.set(category);
  }

  toggleDetails(projectId: number): void {
    this.expandedProject.update(current => current === projectId ? null : projectId);
  }

  getCategoryLabel(category: ProjectCategory): string {
    return this.categories.find(c => c.key === category)?.label ?? '';
  }
}
