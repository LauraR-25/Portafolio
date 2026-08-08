import { Component, signal, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ProjectsService } from '../../services/projects.service';
import { TestimonialsService } from '../../services/testimonials.service';

type ViewKey = 'index' | 'projects' | 'skills' | 'recommendations';

interface MenuItem {
  key: Exclude<ViewKey, 'index'>;
  label: string;
  icon: string;
}

interface SkillBar {
  name: string;
  level: number;
  color: string;
}

const OPEN_DURATION = 720;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative min-h-screen overflow-x-hidden bg-cream-100">
      <!-- Fondo decorativo -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-32 -right-32 w-96 h-96 bg-mustard-200/40 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] bg-olive-200/50 rounded-full blur-3xl"></div>
        <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-brown-200/40 rounded-full blur-3xl"></div>
      </div>

      <!-- Cerrar sesión -->
      <button (click)="logout()"
              class="absolute top-4 left-4 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-cream-50/90 backdrop-blur-glass shadow-card border border-mustard-200/60
                     font-hand text-2xl text-brown-500 hover:text-red-700 hover:border-mustard-300
                     transition-all duration-200">
        🚪 Salir
      </button>

      <!-- ===== Escenario principal: libreta amplia (centro/izquierda) + avatar (derecha) ===== -->
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 min-h-screen
                  flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0">

        <!-- ===== Área de la libreta ===== -->
        <div class="relative w-full flex-1 flex items-center justify-center">
          <div class="notebook-book cursor-pencil" [class.is-open]="open()">
            <div class="book-stack book-stack-2"></div>
            <div class="book-stack book-stack-1"></div>

            <div class="book">
              <!-- Página derecha (bajo la tapa, se revela al abrir) -->
              <div class="book-page book-page-right">
                <div class="book-page-paper rounded-r-2xl">
                  <div class="page-spine-shadow page-spine-shadow--left"></div>
                  <div class="page-holes page-holes--left"></div>
                  <div class="book-page-scroll">
                    <ng-container *ngTemplateOutlet="rightTpl"></ng-container>
                  </div>
                </div>
              </div>

              <!-- Lomo con anillos -->
              <div class="book-spine"></div>
              <div class="book-rings">
                @for (ring of rings; track ring) {
                  <div class="book-ring"></div>
                }
              </div>

              <!-- Tapa / portada que gira sobre el lomo -->
              <div class="book-cover" [class.is-open]="open()">
                <!-- Cara frontal: portada cerrada -->
                <div class="book-cover-face cover-front cursor-pencil" (click)="openBook()">
                  <div class="cover-badge">📌 Portafolio en proceso</div>
                  <div class="cover-tape"></div>
                  <div class="cover-tab cursor-pencil">Abrir →</div>
                  <div class="cover-art">
                    <div class="flex flex-col h-full p-4 md:p-6 pt-5 md:pt-8">
                      <div class="text-center">
                        <p class="font-hand text-lg md:text-2xl text-brown-500">Mi</p>
                        <h1 class="font-hand text-3xl sm:text-4xl md:text-5xl font-bold text-night-900 leading-none">
                          Portafolio
                        </h1>
                        <p class="font-hand text-base md:text-xl text-olive-600 font-semibold mt-1">Desarrolladora Web</p>
                      </div>

                      <div class="flex justify-center mt-3 md:mt-4">
                        <svg class="w-32 md:w-48 h-4 md:h-6 text-mustard-500" viewBox="0 0 200 24" fill="none" aria-hidden="true">
                          <path d="M5 13 Q 28 5 52 12 T 100 12 T 148 12 T 195 12"
                                stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                          <circle cx="195" cy="12" r="3" fill="currentColor"/>
                        </svg>
                      </div>

                      <p class="font-hand text-xs md:text-lg text-brown-400 text-center mt-auto pb-1">
                        ✦ Toca la pestaña o la portada para abrir ✦
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Cara trasera: página izquierda (se ve al abrir) -->
                <div class="book-cover-face book-cover-back">
                  <div class="book-page-paper rounded-l-2xl">
                    <div class="page-spine-shadow page-spine-shadow--right"></div>
                    <div class="page-holes page-holes--right"></div>
                    <div class="book-page-scroll">
                      <ng-container *ngTemplateOutlet="leftTpl"></ng-container>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ===== Columna avatar (escritorio, derecha y abajo) ===== -->
        <div class="hidden lg:flex w-[240px] xl:w-[280px] self-stretch items-end justify-center pb-6 lg:pb-12">
          <div class="relative flex flex-col items-center cursor-pencil pointer-events-none">
            <div class="relative mb-3 lg:mb-4 z-10 animate-float" style="animation-delay: 0.3s">
              <div class="relative bg-cream-50 border-2 border-mustard-300 rounded-2xl
                          px-4 py-1.5 lg:px-5 lg:py-2 shadow-card font-hand text-lg lg:text-2xl
                          text-night-900 whitespace-nowrap">
                ¡Hola, soy Laura! 👋
                <span class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-cream-50
                             border-b-2 border-r-2 border-mustard-300 rotate-45"></span>
              </div>
            </div>
            <div class="absolute bottom-1 left-1/2 -translate-x-1/2 w-44 h-6 rounded-full bg-night-900/10 blur-md"></div>
            <img src="/assets/images/sprites/laura.png" alt="Laura saludando"
                 class="h-[340px] lg:h-[400px] xl:h-[440px] w-auto object-contain drop-shadow-xl animate-float
                        select-none pointer-events-none"
                 (error)="onImageError($event)">
          </div>
        </div>

        <!-- ===== Avatar móvil (debajo de la libreta) ===== -->
        <div class="lg:hidden mt-8 mb-2 relative cursor-pencil">
          <div class="relative flex flex-col items-center">
            <div class="relative mb-2 z-10 animate-float" style="animation-delay: 0.3s">
              <div class="relative bg-cream-50 border-2 border-mustard-300 rounded-2xl
                          px-3 py-1 shadow-card font-hand text-sm text-night-900 whitespace-nowrap">
                ¡Hola, soy Laura! 👋
                <span class="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-cream-50
                             border-b-2 border-r-2 border-mustard-300 rotate-45"></span>
              </div>
            </div>
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-5 rounded-full bg-night-900/10 blur-md"></div>
            <img src="/assets/images/sprites/laura.png" alt="Laura saludando"
                 class="h-[200px] sm:h-[240px] w-auto object-contain drop-shadow-xl animate-float
                        select-none pointer-events-none"
                 (error)="onImageError($event)">
          </div>
        </div>
      </div>

      <!-- ===== Plantilla: página izquierda ===== -->
      <ng-template #leftTpl>
        @switch (view()) {

          @case ('index') {
            <div class="p-4 md:p-6 pl-10 md:pl-11 pr-4">
              <div class="text-center pt-2 md:pt-4">
                <p class="font-hand text-lg md:text-2xl text-brown-500">Mi</p>
                <h2 class="font-hand text-3xl md:text-5xl font-bold text-night-900 leading-none">Portafolio</h2>
                <p class="font-hand text-lg md:text-2xl text-olive-600 font-semibold mt-1">Desarrolladora Web</p>
              </div>

              <div class="flex justify-center mt-4 md:mt-5">
                <svg class="w-40 md:w-56 h-5 md:h-6 text-mustard-500" viewBox="0 0 200 24" fill="none" aria-hidden="true">
                  <path d="M5 13 Q 28 5 52 12 T 100 12 T 148 12 T 195 12"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                  <circle cx="195" cy="12" r="3" fill="currentColor"/>
                </svg>
              </div>

              <ul class="flex flex-col gap-3 md:gap-4 mt-6 md:mt-8 mx-auto w-full max-w-[220px] md:max-w-[280px]">
                @for (item of menu; track item.key) {
                  <li>
                    <button (click)="selectSection(item.key)"
                            class="group w-full flex items-center gap-3 md:gap-4 px-4 md:px-5 py-2.5 md:py-3 rounded-xl md:rounded-2xl
                                   border-2 border-mustard-200/70 bg-cream-50 hover:bg-mustard-50
                                   hover:border-mustard-300 shadow-sm hover:shadow-card cursor-pencil
                                   transition-all duration-300 hover:-translate-y-0.5">
                      <span class="text-xl md:text-2xl leading-none">{{ item.icon }}</span>
                      <span class="font-hand text-2xl md:text-3xl text-night-900
                                   group-hover:text-olive-700 transition-colors">{{ item.label }}</span>
                      <svg class="w-4 md:w-5 h-4 md:h-5 ml-auto text-mustard-500 group-hover:translate-x-1
                                  transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </button>
                  </li>
                }
              </ul>
            </div>
          }

          @case ('projects') {
            <div class="p-4 md:p-6 pl-10 md:pl-11 pr-3.5">
              <h2 class="font-hand text-2xl md:text-3xl text-night-900">Proyectos</h2>
              <div class="mt-3 md:mt-4 space-y-3 md:space-y-4">
                @for (p of leftProjects; track p.id) {
                  <div class="border-l-4 border-mustard-400 pl-2.5 md:pl-3">
                    <h3 class="font-hand text-lg md:text-2xl text-night-900 leading-tight">{{ p.title }}</h3>
                    <p class="font-hand text-base md:text-lg text-brown-600 mt-0.5">{{ p.description }}</p>
                    <div class="flex flex-wrap gap-1.5 md:gap-2 mt-1.5 md:mt-2">
                      @for (t of p.technologies; track t) {
                        <span class="px-2 py-0.5 rounded-full bg-olive-100 text-olive-700
                                     border border-olive-200 font-hand text-sm md:text-base">{{ t }}</span>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          @case ('skills') {
            <div class="p-4 md:p-6 pl-10 md:pl-11 pr-3.5">
              <h2 class="font-hand text-2xl md:text-3xl text-night-900">Mis Habilidades</h2>
              <div class="mt-3 md:mt-4 space-y-2.5 md:space-y-3.5">
                @for (skill of leftSkills; track skill.name) {
                  <div>
                    <div class="flex items-baseline justify-between gap-2">
                      <span class="font-hand text-lg md:text-2xl text-night-900">{{ skill.name }}</span>
                      <span class="font-hand text-lg md:text-2xl font-semibold text-olive-700">{{ skill.level }}%</span>
                    </div>
                    <div class="hand-bar mt-1">
                      <div class="hand-bar-fill"
                           [style.width.%]="revealed() ? skill.level : 0"
                           [style.--bar-color]="skill.color"></div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          @case ('recommendations') {
            <div class="p-4 md:p-6 pl-10 md:pl-11 pr-3.5">
              <h2 class="font-hand text-2xl md:text-3xl text-night-900">Recomendaciones</h2>
              <div class="mt-3 md:mt-4 space-y-3 md:space-y-4">
                @for (t of leftTestimonials; track t.id) {
                  <div class="rounded-xl md:rounded-2xl border border-mustard-200/60 bg-cream-50 p-3 md:p-4 shadow-sm">
                    <div class="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                      <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-olive-500 to-mustard-400
                                  flex items-center justify-center text-cream-50 text-sm md:text-lg font-bold shrink-0">
                        {{ t.name.charAt(0) }}
                      </div>
                      <div class="min-w-0">
                        <h3 class="font-hand text-lg md:text-xl text-night-900 leading-none">{{ t.name }}</h3>
                        <p class="text-[11px] md:text-sm text-brown-500 truncate">{{ t.role }} · {{ t.company }}</p>
                      </div>
                      <span class="ml-auto text-mustard-500 text-sm md:text-base shrink-0">★★★★★</span>
                    </div>
                    <p class="font-hand text-sm md:text-lg text-brown-700 leading-snug">{{ t.text }}</p>
                  </div>
                }
              </div>
            </div>
          }

        }
      </ng-template>

      <!-- ===== Plantilla: página derecha ===== -->
      <ng-template #rightTpl>
        @switch (view()) {

          @case ('index') {
            <div class="p-4 md:p-6 pl-10 md:pl-11 pr-4 flex flex-col h-full">
              <div class="text-center mt-6 md:mt-12">
                <p class="font-hand text-3xl md:text-5xl text-mustard-500">✨</p>
                <h3 class="font-hand text-2xl md:text-4xl text-night-900 mt-2 md:mt-3">¡Bienvenida!</h3>
                <p class="font-hand text-lg md:text-2xl text-brown-600 mt-2 md:mt-3 leading-snug">
                  En estas páginas encontrarás mis proyectos, habilidades y recomendaciones.
                </p>
              </div>
              <div class="mt-auto mb-2 md:mb-3 text-center">
                <button (click)="closeBook()" class="close-book-btn cursor-pencil">
                  🔒 Cerrar libreta
                </button>
              </div>
            </div>
          }

          @case ('projects') {
            <div class="p-4 md:p-6 pl-10 md:pl-11 pr-3.5">
              <div class="flex items-center justify-between gap-2 mb-3 md:mb-5">
                <span class="font-hand text-lg md:text-2xl text-mustard-500 whitespace-nowrap">✦ {{ viewLabel() }}</span>
                <button (click)="goToIndex()" class="back-btn">← Volver al índice</button>
              </div>

              <div class="space-y-3 md:space-y-4">
                @for (p of rightProjects; track p.id) {
                  <div class="border-l-4 border-mustard-400 pl-2.5 md:pl-3">
                    <h3 class="font-hand text-lg md:text-2xl text-night-900 leading-tight">{{ p.title }}</h3>
                    <p class="font-hand text-base md:text-lg text-brown-600 mt-0.5">{{ p.description }}</p>
                    <div class="flex flex-wrap gap-1.5 md:gap-2 mt-1.5 md:mt-2">
                      @for (t of p.technologies; track t) {
                        <span class="px-2 py-0.5 rounded-full bg-olive-100 text-olive-700
                                     border border-olive-200 font-hand text-sm md:text-base">{{ t }}</span>
                      }
                    </div>
                  </div>
                }
              </div>

              <div class="mt-4 md:mt-6 text-center">
                <button (click)="closeBook()" class="back-btn">🔒 Cerrar libreta</button>
              </div>
            </div>
          }

          @case ('skills') {
            <div class="p-4 md:p-6 pl-10 md:pl-11 pr-3.5">
              <div class="flex items-center justify-between gap-2 mb-3 md:mb-5">
                <span class="font-hand text-lg md:text-2xl text-mustard-500 whitespace-nowrap">✦ {{ viewLabel() }}</span>
                <button (click)="goToIndex()" class="back-btn">← Volver al índice</button>
              </div>

              <div class="space-y-2.5 md:space-y-3.5">
                @for (skill of rightSkills; track skill.name) {
                  <div>
                    <div class="flex items-baseline justify-between gap-2">
                      <span class="font-hand text-lg md:text-2xl text-night-900">{{ skill.name }}</span>
                      <span class="font-hand text-lg md:text-2xl font-semibold text-olive-700">{{ skill.level }}%</span>
                    </div>
                    <div class="hand-bar mt-1">
                      <div class="hand-bar-fill"
                           [style.width.%]="revealed() ? skill.level : 0"
                           [style.--bar-color]="skill.color"></div>
                    </div>
                  </div>
                }
              </div>

              <div class="mt-4 md:mt-6 text-center">
                <button (click)="closeBook()" class="back-btn">🔒 Cerrar libreta</button>
              </div>
            </div>
          }

          @case ('recommendations') {
            <div class="p-4 md:p-6 pl-10 md:pl-11 pr-3.5">
              <div class="flex items-center justify-between gap-2 mb-3 md:mb-5">
                <span class="font-hand text-lg md:text-2xl text-mustard-500 whitespace-nowrap">✦ {{ viewLabel() }}</span>
                <button (click)="goToIndex()" class="back-btn">← Volver al índice</button>
              </div>

              <div class="space-y-3 md:space-y-4">
                @for (t of rightTestimonials; track t.id) {
                  <div class="rounded-xl md:rounded-2xl border border-mustard-200/60 bg-cream-50 p-3 md:p-4 shadow-sm">
                    <div class="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                      <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-olive-500 to-mustard-400
                                  flex items-center justify-center text-cream-50 text-sm md:text-lg font-bold shrink-0">
                        {{ t.name.charAt(0) }}
                      </div>
                      <div class="min-w-0">
                        <h3 class="font-hand text-lg md:text-xl text-night-900 leading-none">{{ t.name }}</h3>
                        <p class="text-[11px] md:text-sm text-brown-500 truncate">{{ t.role }} · {{ t.company }}</p>
                      </div>
                      <span class="ml-auto text-mustard-500 text-sm md:text-base shrink-0">★★★★★</span>
                    </div>
                    <p class="font-hand text-sm md:text-lg text-brown-700 leading-snug">{{ t.text }}</p>
                  </div>
                }
              </div>

              <div class="mt-4 md:mt-6 text-center">
                <button (click)="closeBook()" class="back-btn">🔒 Cerrar libreta</button>
              </div>
            </div>
          }

        }
      </ng-template>
    </div>
  `
})
export class HomeComponent implements OnDestroy {
  private authService = inject(AuthService);
  private projectsService = inject(ProjectsService);
  private testimonialsService = inject(TestimonialsService);

  projects = this.projectsService.getProjects();
  testimonials = this.testimonialsService.getTestimonials();

  menu: MenuItem[] = [
    { key: 'projects', label: 'Proyectos', icon: '✏️' },
    { key: 'skills', label: 'Habilidades', icon: '📏' },
    { key: 'recommendations', label: 'Recomendaciones', icon: '💬' },
  ];

  skills: SkillBar[] = [
    { name: 'Angular', level: 95, color: '#C58B2B' },
    { name: 'HTML', level: 95, color: '#D4A373' },
    { name: 'CSS', level: 93, color: '#8CA052' },
    { name: 'TypeScript', level: 92, color: '#6F421F' },
    { name: 'Git', level: 90, color: '#556B2F' },
    { name: 'Express JS', level: 88, color: '#A9731F' },
    { name: 'Node JS', level: 85, color: '#8B5E3C' },
    { name: 'Postgres', level: 82, color: '#AB7D55' },
    { name: 'Docker', level: 80, color: '#6A8037' },
    { name: 'Java', level: 70, color: '#556B2F' },
  ];

  rings = Array.from({ length: 11 }, (_, i) => i);

  leftProjects = this.projects.slice(0, Math.ceil(this.projects.length / 2));
  rightProjects = this.projects.slice(Math.ceil(this.projects.length / 2));

  leftSkills = this.skills.slice(0, 5);
  rightSkills = this.skills.slice(5);

  leftTestimonials = this.testimonials.slice(0, Math.ceil(this.testimonials.length / 2));
  rightTestimonials = this.testimonials.slice(Math.ceil(this.testimonials.length / 2));

  open = signal(false);
  view = signal<ViewKey>('index');
  revealed = signal(false);
  transitioning = signal(false);

  private bookTimer: ReturnType<typeof setTimeout> | null = null;
  private sectionTimer: ReturnType<typeof setTimeout> | null = null;

  openBook(): void {
    if (this.transitioning() || this.open()) return;

    this.view.set('index');
    this.revealed.set(false);
    this.transitioning.set(true);
    this.open.set(true);

    if (this.bookTimer) clearTimeout(this.bookTimer);
    this.bookTimer = setTimeout(() => {
      this.transitioning.set(false);
      this.revealed.set(true);
    }, OPEN_DURATION);
  }

  selectSection(key: Exclude<ViewKey, 'index'>): void {
    if (this.transitioning() || key === this.view()) return;

    this.revealed.set(false);
    this.view.set(key);

    if (this.sectionTimer) clearTimeout(this.sectionTimer);
    this.sectionTimer = setTimeout(() => this.revealed.set(true), 80);
  }

  goToIndex(): void {
    this.closeBook();
  }

  closeBook(): void {
    if (this.transitioning() || !this.open()) return;

    this.transitioning.set(true);
    this.open.set(false);

    if (this.bookTimer) clearTimeout(this.bookTimer);
    this.bookTimer = setTimeout(() => {
      this.transitioning.set(false);
    }, OPEN_DURATION);
  }

  viewLabel(): string {
    const labels: Record<ViewKey, string> = {
      index: 'Índice',
      projects: 'Proyectos',
      skills: 'Habilidades',
      recommendations: 'Recomendaciones',
    };
    return labels[this.view()];
  }

  logout(): void {
    this.authService.logout();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.warn('No se pudo cargar el sprite de Laura:', img?.src);
    if (img) {
      img.style.visibility = 'hidden';
    }
  }

  ngOnDestroy(): void {
    if (this.bookTimer) clearTimeout(this.bookTimer);
    if (this.sectionTimer) clearTimeout(this.sectionTimer);
  }
}
