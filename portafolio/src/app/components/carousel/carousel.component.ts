import { Component, signal, computed, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="section-title">Proyectos <span class="gradient-text">Destacados</span></h2>
          <p class="section-subtitle">Los proyectos más relevantes que demuestran mi experiencia y pasión por el desarrollo</p>
        </div>

        <div class="relative">
          <!-- Carousel container -->
          <div class="overflow-hidden rounded-3xl">
            <div class="flex transition-transform duration-500 ease-in-out"
                 [style.transform]="'translateX(-' + (currentIndex() * 100) + '%)'">
              @for (project of featuredProjects; track project.id; let i = $index) {
                <div class="w-full flex-shrink-0 px-2">
                  <div class="relative group rounded-3xl overflow-hidden bg-white shadow-elevated">
                    <!-- Image -->
                    <div class="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                      <img [src]="project.image" [alt]="project.title"
                           class="w-full h-full object-cover transition-transform duration-700
                                  group-hover:scale-105">
                      <div class="absolute inset-0 bg-gradient-to-t from-violet-950/80 via-violet-950/20 to-transparent"></div>

                      <!-- Overlay content -->
                      <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <div class="flex flex-wrap gap-2 mb-3">
                          @for (tech of project.technologies.slice(0, 4); track tech) {
                            <span class="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm
                                         text-white text-xs font-medium">
                              {{ tech }}
                            </span>
                          }
                        </div>
                        <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">{{ project.title }}</h3>
                        <p class="text-violet-200 text-sm md:text-base max-w-2xl">{{ project.description }}</p>
                      </div>
                    </div>

                    <!-- Actions -->
                    <div class="p-6 md:p-8 flex items-center justify-between">
                      <div class="flex gap-3">
                        <a [href]="project.githubUrl" target="_blank" rel="noopener noreferrer"
                           class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100
                                  text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors">
                          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                        @if (project.liveUrl) {
                          <a [href]="project.liveUrl" target="_blank" rel="noopener noreferrer"
                             class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600
                                    text-white text-sm font-medium hover:bg-violet-700 transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                            </svg>
                            Live Demo
                          </a>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Navigation arrows -->
          <button (click)="prev()"
                  class="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12
                         rounded-full bg-white/90 backdrop-blur-sm shadow-card flex items-center justify-center
                         text-violet-600 hover:bg-violet-600 hover:text-white transition-all duration-300
                         hover:scale-110">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button (click)="next()"
                  class="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12
                         rounded-full bg-white/90 backdrop-blur-sm shadow-card flex items-center justify-center
                         text-violet-600 hover:bg-violet-600 hover:text-white transition-all duration-300
                         hover:scale-110">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Indicators -->
        <div class="flex items-center justify-center gap-2 mt-8">
          @for (project of featuredProjects; track project.id; let i = $index) {
            <button (click)="goTo(i)"
                    class="transition-all duration-300 rounded-full"
                    [class]="i === currentIndex()
                      ? 'w-8 h-2 bg-violet-600'
                      : 'w-2 h-2 bg-violet-300 hover:bg-violet-400'">
            </button>
          }
        </div>
      </div>
    </section>
  `
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentIndex = signal(0);
  featuredProjects: any[] = [];
  private autoPlayInterval: any;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.featuredProjects = this.projectsService.getFeaturedProjects();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => this.next(), 5000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  next(): void {
    this.currentIndex.update(i => (i + 1) % this.featuredProjects.length);
  }

  prev(): void {
    this.currentIndex.update(i =>
      i === 0 ? this.featuredProjects.length - 1 : i - 1
    );
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
