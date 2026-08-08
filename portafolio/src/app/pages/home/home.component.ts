import { Component, signal, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TestimonialsService } from '../../services/testimonials.service';
import { NOTEBOOK_PROJECTS, NotebookProject } from '../../models/notebook-project.model';

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

interface FlipState {
  active: boolean;
  dir: 'forward' | 'backward';
  from: ViewKey;
  to: ViewKey;
  pastMid: boolean;
}

const OPEN_DURATION = 720;
const FLIP_DURATION = 680;
const FLIP_MID = FLIP_DURATION / 2;

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

      <!-- ===== Escenario principal: libreta centrada como único elemento protagónico ===== -->
      <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 py-6 md:py-10 min-h-screen
                  flex items-center justify-center">

        <!-- ===== Área de la libreta ===== -->
        <div class="relative flex items-center justify-center">
          <div class="notebook-book cursor-pencil"
               [class.is-open]="open()"
               [class.is-flipping]="flip().active">
            <div class="book-stack book-stack-2"></div>
            <div class="book-stack book-stack-1"></div>

            <div class="book">
              <!-- Página derecha (bajo la tapa, se revela al abrir) -->
              <div class="book-page book-page-right">
                <div class="book-page-paper rounded-r-2xl">
                  <div class="page-spine-shadow page-spine-shadow--left"></div>
                  <div class="page-holes page-holes--left"></div>
                  <div class="book-page-scroll">
                    <ng-container *ngTemplateOutlet="viewRight; context: { v: view() }"></ng-container>
                  </div>
                </div>
              </div>

              <!-- Hoja de volteo para el cambio de página -->
              <div class="book-flip"
                   [class.is-visible]="flip().active"
                   [class.is-forward]="flip().dir === 'forward'"
                   [class.is-backward]="flip().dir === 'backward'"
                   [class.is-past-mid]="flip().pastMid">
                <div class="book-flip-face book-flip-face--front">
                  <div class="book-page-paper rounded-2xl">
                    <div class="book-page-scroll">
                      <ng-container *ngTemplateOutlet="flip().dir === 'forward' ? viewRight : viewLeft; context: { v: flip().from }"></ng-container>
                    </div>
                  </div>
                </div>
                <div class="book-flip-face book-flip-face--back">
                  <div class="book-page-paper rounded-2xl">
                    <div class="book-page-scroll">
                      <ng-container *ngTemplateOutlet="flip().dir === 'forward' ? viewLeft : viewRight; context: { v: flip().to }"></ng-container>
                    </div>
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
                        <p class="font-hand text-lg md:text-3xl text-brown-500">Mi</p>
                        <h1 class="font-hand text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-night-900 leading-none">
                          Portafolio
                        </h1>
                        <p class="font-hand text-base md:text-2xl text-olive-600 font-semibold mt-1">Desarrolladora Web</p>
                      </div>

                      <div class="flex justify-center mt-3 md:mt-4">
                        <svg class="w-32 md:w-64 h-4 md:h-7 text-mustard-500" viewBox="0 0 200 24" fill="none" aria-hidden="true">
                          <path d="M5 13 Q 28 5 52 12 T 100 12 T 148 12 T 195 12"
                                stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                          <circle cx="195" cy="12" r="3" fill="currentColor"/>
                        </svg>
                      </div>

                      <p class="font-hand text-xs md:text-xl text-brown-400 text-center mt-auto pb-1">
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
                      <ng-container *ngTemplateOutlet="viewLeft; context: { v: view() }"></ng-container>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== Plantilla reutilizable: página izquierda según la vista ===== -->
      <ng-template #viewLeft let-v="v">
        @switch (v) {

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

              <ul class="flex flex-col gap-3 md:gap-5 mt-6 md:mt-10 mx-auto w-full max-w-[240px] md:max-w-[340px] lg:max-w-[400px]">
                @for (item of menu; track item.key) {
                  <li>
                    <button (click)="selectSection(item.key)"
                            class="group w-full flex items-center gap-3 md:gap-4 px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl
                                   border-2 border-mustard-200/70 bg-cream-50 hover:bg-mustard-50
                                   hover:border-mustard-300 shadow-sm hover:shadow-card cursor-pencil
                                   transition-all duration-300 hover:-translate-y-0.5">
                      <span class="text-xl md:text-3xl leading-none">{{ item.icon }}</span>
                      <span class="font-hand text-2xl md:text-4xl text-night-900
                                   group-hover:text-olive-700 transition-colors">{{ item.label }}</span>
                      <svg class="w-4 md:w-6 h-4 md:h-6 ml-auto text-mustard-500 group-hover:translate-x-1
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
              <h2 class="font-hand text-2xl md:text-4xl text-night-900">Proyectos</h2>
              <p class="font-hand text-base md:text-2xl text-brown-500 mt-0.5">✦ Mis demos favoritas</p>
              <div class="mt-3 md:mt-4 grid grid-cols-1 gap-3 md:gap-4">
                @for (p of leftNotebookProjects; track p.id; let i = $index) {
                  <ng-container *ngTemplateOutlet="projectCardTpl; context: { $implicit: p, i: i }"></ng-container>
                }
              </div>
            </div>
          }

          @case ('skills') {
            <div class="p-4 md:p-6 pl-10 md:pl-11 pr-3.5">
              <h2 class="font-hand text-2xl md:text-4xl text-night-900">Mis Habilidades</h2>
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
              <h2 class="font-hand text-2xl md:text-4xl text-night-900">Recomendaciones</h2>
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

      <!-- ===== Plantilla reutilizable: página derecha según la vista ===== -->
      <ng-template #viewRight let-v="v">
        @switch (v) {

          @case ('index') {
            <div class="p-4 md:p-6 pl-10 md:pl-11 pr-4 flex flex-col h-full">
              <div class="text-center mt-6 md:mt-12">
                <p class="font-hand text-3xl md:text-5xl text-mustard-500">✨</p>
                <h3 class="font-hand text-2xl md:text-5xl text-night-900 mt-2 md:mt-3">¡Bienvenida!</h3>
                <p class="font-hand text-lg md:text-3xl text-brown-600 mt-2 md:mt-3 leading-snug">
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

              <div class="grid grid-cols-1 gap-3 md:gap-4">
                @for (p of rightNotebookProjects; track p.id; let i = $index) {
                  <ng-container *ngTemplateOutlet="projectCardTpl; context: { $implicit: p, i: i }"></ng-container>
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

      <!-- ===== Tarjeta de proyecto compartida (estilo nota/recorte de papel) ===== -->
      <ng-template #projectCardTpl let-p="$implicit" let-i="i">
        <article class="relative rounded-xl md:rounded-2xl border border-mustard-200/70 bg-cream-50/95 shadow-card
                        p-3 md:p-4 cursor-pencil transition-transform duration-300"
                 [ngClass]="i % 2 === 0 ? 'rotate-[-0.8deg] hover:rotate-0' : 'rotate-[0.7deg] hover:rotate-0'">
          <span class="absolute -top-2 left-5 w-16 h-4 rounded-sm bg-mustard-200/70 shadow-sm"
                [ngClass]="i % 2 === 0 ? 'rotate-[-5deg]' : 'rotate-[4deg]'"></span>

          <h3 class="font-hand text-xl md:text-2xl font-bold text-olive-700 leading-tight">{{ p.title }}</h3>

          <div class="mt-2 rounded-lg overflow-hidden border border-mustard-200/70 bg-cream-200/50 shadow-sm">
            @if (!failedGifs().has(p.id)) {
              <img [src]="p.gif" [alt]="p.title"
                   [class]="'w-full max-w-full ' + p.aspect + ' object-contain'"
                   loading="lazy" decoding="async" (error)="onGifError(p.id)">
            } @else {
              <div [class]="'w-full ' + p.aspect + ' flex items-center justify-center bg-cream-200/60'">
                <span class="font-hand text-lg text-brown-400">✖ GIF no disponible</span>
              </div>
            }
          </div>

          <p class="font-hand text-sm md:text-base text-brown-600 mt-2 leading-snug">{{ p.description }}</p>

          <a [href]="p.repositoryUrl" target="_blank" rel="noopener noreferrer"
             class="mt-3 inline-flex items-center gap-1.5 font-hand text-base md:text-lg font-semibold
                    text-cream-50 bg-olive-600 hover:bg-olive-700 rounded-lg px-3 py-1.5 shadow-md
                    transition-all duration-200 hover:-translate-y-0.5 cursor-pencil">
            <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Ver Repositorio
          </a>
        </article>
      </ng-template>
    </div>
  `
})
export class HomeComponent implements OnDestroy {
  private authService = inject(AuthService);
  private testimonialsService = inject(TestimonialsService);

  testimonials = this.testimonialsService.getTestimonials();

  menu: MenuItem[] = [
    { key: 'projects', label: 'Proyectos', icon: '✏️' },
    { key: 'skills', label: 'Habilidades', icon: '📏' },
    { key: 'recommendations', label: 'Recomendaciones', icon: '💬' },
  ];

  skills: SkillBar[] = [
    { name: 'Angular', level: 10, color: '#C58B2B' },
    { name: 'HTML', level: 15, color: '#D4A373' },
    { name: 'CSS', level: 20, color: '#8CA052' },
    { name: 'TypeScript', level: 15, color: '#6F421F' },
    { name: 'Git', level: 35, color: '#556B2F' },
    { name: 'Express JS', level: 5, color: '#A9731F' },
    { name: 'Node JS', level: 10, color: '#8B5E3C' },
    { name: 'Postgres', level: 8, color: '#AB7D55' },
    { name: 'Docker', level: 10, color: '#6A8037' },
    { name: 'Java', level: 15, color: '#556B2F' },
  ];

  rings = Array.from({ length: 11 }, (_, i) => i);

  notebookProjects = NOTEBOOK_PROJECTS;
  leftNotebookProjects: NotebookProject[] = this.notebookProjects.slice(0, 2);
  rightNotebookProjects: NotebookProject[] = this.notebookProjects.slice(2);

  failedGifs = signal<Set<number>>(new Set());

  leftSkills = this.skills.slice(0, 5);
  rightSkills = this.skills.slice(5);

  leftTestimonials = this.testimonials.slice(0, Math.ceil(this.testimonials.length / 2));
  rightTestimonials = this.testimonials.slice(Math.ceil(this.testimonials.length / 2));

  open = signal(false);
  view = signal<ViewKey>('index');
  revealed = signal(false);
  transitioning = signal(false);
  flip = signal<FlipState>({ active: false, dir: 'forward', from: 'index', to: 'index', pastMid: false });

  private bookTimer: ReturnType<typeof setTimeout> | null = null;
  private midTimer: ReturnType<typeof setTimeout> | null = null;
  private flipTimer: ReturnType<typeof setTimeout> | null = null;

  openBook(): void {
    if (this.transitioning() || this.open()) return;

    this.view.set('index');
    this.revealed.set(false);
    this.transitioning.set(true);
    this.open.set(true);
    this.resetFlip();

    if (this.bookTimer) clearTimeout(this.bookTimer);
    this.bookTimer = setTimeout(() => {
      this.transitioning.set(false);
      this.revealed.set(true);
    }, OPEN_DURATION);
  }

  selectSection(key: Exclude<ViewKey, 'index'>): void {
    if (this.transitioning() || this.flip().active || key === this.view()) return;

    this.startFlip('forward', this.view(), key);
  }

  goToIndex(): void {
    if (this.transitioning() || this.flip().active || this.view() === 'index') return;

    this.startFlip('backward', this.view(), 'index');
  }

  private startFlip(dir: FlipState['dir'], from: ViewKey, to: ViewKey): void {
    this.resetFlip();
    this.flip.set({ active: true, dir, from, to, pastMid: false });
    this.revealed.set(false);

    // Intercambio del contenido y elevación de capa exactamente en el punto
    // medio (hoja a 90°, perpendicular a la pantalla), imperceptible al usuario.
    this.midTimer = setTimeout(() => {
      this.view.set(to);
      this.flip.update(f => ({ ...f, pastMid: true }));
    }, FLIP_MID);
    this.flipTimer = setTimeout(() => {
      this.flip.set({ active: false, dir, from, to, pastMid: false });
      this.revealed.set(true);
    }, FLIP_DURATION);
  }

  private resetFlip(): void {
    if (this.midTimer) clearTimeout(this.midTimer);
    if (this.flipTimer) clearTimeout(this.flipTimer);
    this.flip.set({ active: false, dir: 'forward', from: 'index', to: 'index', pastMid: false });
  }

  closeBook(): void {
    if (this.transitioning() || this.flip().active || !this.open()) return;

    this.transitioning.set(true);
    this.open.set(false);
    this.resetFlip();

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

  onGifError(projectId: number): void {
    this.failedGifs.update(prev => new Set(prev).add(projectId));
  }

  ngOnDestroy(): void {
    if (this.bookTimer) clearTimeout(this.bookTimer);
    this.resetFlip();
  }
}
