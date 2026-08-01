import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ProjectsService } from '../../services/projects.service';
import { TestimonialsService } from '../../services/testimonials.service';

type PageKey = 'index' | 'projects' | 'skills' | 'recommendations';

interface MenuItem {
  key: PageKey;
  label: string;
  icon: string;
}

interface SkillBar {
  name: string;
  level: number;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative min-h-screen overflow-hidden bg-cream-100">
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

      <div class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14
                  grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 lg:gap-14 items-center min-h-screen">

        <!-- ===== LADO IZQUIERDO: Laura + bocadillo ===== -->
        <div class="relative flex items-center justify-center cursor-pencil">
          <div class="absolute bottom-8 left-1/2 -translate-x-1/2 w-44 h-7 rounded-full bg-night-900/10 blur-md"></div>

          <!-- Bocadillo de diálogo -->
          <div class="absolute -top-2 left-1/2 -translate-x-1/2 z-10 animate-float" style="animation-delay: 0.3s">
            <div class="relative bg-cream-50 border-2 border-mustard-300 rounded-2xl
                        px-5 py-2 shadow-card font-hand text-xl sm:text-2xl md:text-3xl
                        text-night-900 whitespace-nowrap">
              ¡Hola, soy Laura! 👋
              <span class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-cream-50
                           border-b-2 border-r-2 border-mustard-300 rotate-45"></span>
            </div>
          </div>

          <img src="/assets/images/sprites/laura.png" alt="Laura saludando"
               class="h-[400px] md:h-[470px] w-auto object-contain drop-shadow-xl animate-float
                      select-none pointer-events-none"
               (error)="onImageError($event)">
        </div>

        <!-- ===== LADO DERECHO: La libreta ===== -->
        <div class="relative cursor-pencil">
          <!-- Pila de hojas detrás -->
          <div class="absolute inset-0 rounded-3xl bg-cream-200 border border-mustard-200/50
                      translate-x-2 -translate-y-2 rotate-[0.5deg]"></div>
          <div class="absolute inset-0 rounded-3xl bg-cream-300/60 border border-mustard-200/40
                      translate-x-1 -translate-y-1 -rotate-[0.4deg]"></div>

          <!-- Pin distintivo -->
          <div class="absolute -top-4 right-4 md:right-8 z-30 rotate-3">
            <div class="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-mustard-500 text-cream-50
                        shadow-card font-hand text-xl md:text-2xl whitespace-nowrap">
              📌 Portafolio en proceso
            </div>
          </div>

          <!-- Cinta decorativa -->
          <div class="absolute -top-3 left-8 w-24 h-6 bg-mustard-200/70 rounded-sm -rotate-6 z-20"></div>

          <!-- Libro con volteado 3D -->
          <div class="notebook-book h-[540px] md:h-[620px] w-full">
            <div class="notebook-sheets"
                 [class.turned]="flipped()"
                 [class.no-anim]="noAnim()">

              <!-- Hoja frontal (página actual) -->
              <div class="notebook-sheet shadow-elevated border border-mustard-200/60 overflow-hidden">
                <div class="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-night-900/10 to-transparent pointer-events-none"></div>
                <div class="paper h-full w-full overflow-y-auto">
                  <ng-container *ngTemplateOutlet="pageTpl; context: { key: page() }"></ng-container>
                </div>
              </div>

              <!-- Hoja trasera (página a revelar) -->
              <div class="notebook-sheet notebook-sheet-back shadow-elevated border border-mustard-200/60 overflow-hidden">
                <div class="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-night-900/10 to-transparent pointer-events-none"></div>
                <div class="paper h-full w-full overflow-y-auto">
                  <ng-container *ngTemplateOutlet="pageTpl; context: { key: reveal() }"></ng-container>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- ===== Plantilla de páginas de la libreta ===== -->
      <ng-template #pageTpl let-key="key">
        @switch (key) {

          @case ('index') {
            <div class="flex flex-col h-full p-6 md:p-10">
              <div class="text-center pt-2 md:pt-8">
                <p class="font-hand text-3xl md:text-4xl text-brown-500">Mi</p>
                <h1 class="font-hand text-5xl sm:text-7xl md:text-8xl font-bold text-night-900 leading-none">
                  Portafolio
                </h1>
                <p class="font-hand text-3xl md:text-4xl text-olive-600 font-semibold mt-1">Desarrolladora Web</p>
              </div>

              <!-- Línea divisoria decorativa -->
              <div class="flex justify-center mt-6">
                <svg class="w-56 md:w-64 h-6 text-mustard-500" viewBox="0 0 200 24" fill="none" aria-hidden="true">
                  <path d="M5 13 Q 28 5 52 12 T 100 12 T 148 12 T 195 12"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                  <circle cx="195" cy="12" r="3" fill="currentColor"/>
                </svg>
              </div>

              <!-- Menú de viñetas -->
              <ul class="flex flex-col gap-3.5 md:gap-4 mt-8 md:mt-10 mx-auto w-full max-w-sm">
                @for (item of menu; track item.key) {
                  <li>
                    <button (click)="goTo(item.key)"
                            class="group w-full flex items-center gap-4 px-5 py-2.5 rounded-2xl
                                   border-2 border-mustard-200/70 bg-cream-50 hover:bg-mustard-50
                                   hover:border-mustard-300 shadow-sm hover:shadow-card
                                   transition-all duration-300 hover:-translate-y-0.5 cursor-pencil">
                      <span class="text-2xl leading-none">{{ item.icon }}</span>
                      <span class="font-hand text-3xl md:text-4xl text-night-900
                                   group-hover:text-olive-700 transition-colors">{{ item.label }}</span>
                      <svg class="w-5 h-5 ml-auto text-mustard-500 group-hover:translate-x-1
                                  transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </button>
                  </li>
                }
              </ul>

              <p class="font-hand text-xl md:text-2xl text-brown-400 text-center mt-8">
                ✦ Escoge una sección para continuar ✦
              </p>
            </div>
          }

          @case ('projects') {
            <div class="flex flex-col h-full p-6 md:p-8 pl-12 md:pl-14">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <h2 class="font-hand text-4xl md:text-5xl text-night-900">Proyectos</h2>
                <button (click)="goTo('index')" class="back-btn">← Volver al índice</button>
              </div>

              <div class="space-y-6">
                @for (p of projects; track p.id) {
                  <div class="border-l-4 border-mustard-400 pl-4">
                    <h3 class="font-hand text-3xl md:text-4xl text-night-900 leading-tight">{{ p.title }}</h3>
                    <p class="font-hand text-xl md:text-2xl text-brown-600 mt-1">{{ p.description }}</p>
                    <div class="flex flex-wrap gap-2 mt-3">
                      @for (t of p.technologies; track t) {
                        <span class="px-2.5 py-0.5 rounded-full bg-olive-100 text-olive-700
                                     border border-olive-200 font-hand text-lg">{{ t }}</span>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          @case ('skills') {
            <div class="flex flex-col h-full p-6 md:p-8 pl-12 md:pl-14">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <h2 class="font-hand text-4xl md:text-5xl text-night-900">Mis Habilidades</h2>
                <button (click)="goTo('index')" class="back-btn">← Volver al índice</button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pb-2">
                @for (skill of skills; track skill.name) {
                  <div>
                    <div class="flex items-baseline justify-between gap-2">
                      <span class="font-hand text-2xl md:text-3xl text-night-900">{{ skill.name }}</span>
                      <span class="font-hand text-2xl md:text-3xl font-semibold text-olive-700">{{ skill.level }}%</span>
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
            <div class="flex flex-col h-full p-6 md:p-8 pl-12 md:pl-14">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <h2 class="font-hand text-4xl md:text-5xl text-night-900">Recomendaciones</h2>
                <button (click)="goTo('index')" class="back-btn">← Volver al índice</button>
              </div>

              <div class="space-y-5">
                @for (t of testimonials; track t.id) {
                  <div class="rounded-2xl border border-mustard-200/60 bg-cream-50 p-4 md:p-5 shadow-sm">
                    <div class="flex items-center gap-3 mb-2">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-olive-500 to-mustard-400
                                  flex items-center justify-center text-cream-50 text-lg font-bold shrink-0">
                        {{ t.name.charAt(0) }}
                      </div>
                      <div class="min-w-0">
                        <h3 class="font-hand text-2xl md:text-3xl text-night-900 leading-none">{{ t.name }}</h3>
                        <p class="text-sm text-brown-500 truncate">{{ t.role }} · {{ t.company }}</p>
                      </div>
                      <span class="ml-auto text-mustard-500 text-lg leading-none shrink-0">★★★★★</span>
                    </div>
                    <p class="font-hand text-xl md:text-2xl text-brown-700 leading-snug">{{ t.text }}</p>
                  </div>
                }
              </div>
            </div>
          }

        }
      </ng-template>
    </div>
  `
})
export class HomeComponent {
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

  page = signal<PageKey>('index');
  reveal = signal<PageKey>('index');
  flipped = signal(false);
  noAnim = signal(false);
  transitioning = signal(false);
  revealed = signal(false);

  private flipTimer: ReturnType<typeof setTimeout> | null = null;

  goTo(key: PageKey): void {
    if (this.transitioning() || key === this.page()) return;

    this.revealed.set(false);
    this.reveal.set(key);
    this.transitioning.set(true);
    this.flipped.set(true);

    if (this.flipTimer) clearTimeout(this.flipTimer);
    this.flipTimer = setTimeout(() => {
      this.page.set(key);
      this.noAnim.set(true);
      this.flipped.set(false);
      requestAnimationFrame(() => {
        this.noAnim.set(false);
        this.transitioning.set(false);
        setTimeout(() => this.revealed.set(true), 60);
      });
    }, 720);
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
}
