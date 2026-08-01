import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="inicio" class="relative min-h-screen flex items-center overflow-hidden pt-20">
      <!-- Background decoration -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-mustard-200/30 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-olive-200/40 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                    bg-gradient-to-r from-olive-100/30 to-mustard-100/30 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Text Content -->
          <div class="space-y-8 animate-slide-up">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-olive-100 text-olive-700
                        text-sm font-medium border border-mustard-200/60">
              <span class="w-2 h-2 rounded-full bg-mustard-500 animate-pulse-soft"></span>
              Disponible para proyectos
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-night-900 leading-tight">
              Hola, soy
              <span class="block gradient-text">Laura</span>
              <span class="text-2xl sm:text-3xl lg:text-4xl text-brown-600 font-bold">
                Desarrolladora Web / Estudiante de Ingeniería de Computación
              </span>
            </h1>

            <p class="text-lg text-brown-500 max-w-lg leading-relaxed">
              Creo experiencias digitales excepcionales con código limpio, arquitectura escalable
              y diseño intuitivo. Especializada en Angular y ecosistemas modernos.
            </p>

            <div class="flex flex-wrap gap-4">
              <button (click)="scrollTo('proyectos')" class="btn-primary">
                <span>Ver Proyectos</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </button>
              <button (click)="scrollTo('contacto')" class="btn-outline">
                <span>Contactar</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 pt-8 border-t border-mustard-100">
              @for (stat of stats; track stat.label) {
                <div class="text-center">
                  <div class="text-2xl sm:text-3xl font-extrabold gradient-text">{{ stat.value }}</div>
                  <div class="text-xs sm:text-sm text-brown-400 mt-1">{{ stat.label }}</div>
                </div>
              }
            </div>
          </div>

          <!-- Hero Visual -->
          <div class="relative hidden lg:flex items-center justify-center animate-fade-in">
            <div class="relative w-80 h-80">
              <!-- Profile image area -->
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-olive-500 to-mustard-400
                          shadow-elevated animate-float overflow-hidden border border-mustard-300/50">
                <div class="absolute inset-2 rounded-2xl bg-gradient-to-br from-olive-100 to-mustard-100
                            flex items-center justify-center overflow-hidden">
                  <img src="/assets/images/sprites/laura.png" alt="Laura"
                       class="w-full h-full object-contain"
                       (error)="onImageError($event)">
                </div>
              </div>

              <!-- Floating badges -->
              <div class="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-cream-50/90 backdrop-blur-glass shadow-card
                          text-sm font-medium text-olive-700 border border-mustard-200/60 animate-float" style="animation-delay: 0.5s">
                🚀 Angular Expert
              </div>
              <div class="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-cream-50/90 backdrop-blur-glass shadow-card
                          text-sm font-medium text-olive-700 border border-mustard-200/60 animate-float" style="animation-delay: 1s">
                ⚡ TypeScript
              </div>
              <div class="absolute top-1/2 -right-8 px-4 py-2 rounded-xl bg-cream-50/90 backdrop-blur-glass shadow-card
                          text-sm font-medium text-olive-700 border border-mustard-200/60 animate-float" style="animation-delay: 1.5s">
                🎨 UI/UX Design
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                  text-mustard-500 animate-bounce">
        <span class="text-xs font-medium">Scroll</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>
  `
})
export class HeroComponent {
  stats = [
    { value: '5+', label: 'Años de Experiencia' },
    { value: '50+', label: 'Proyectos Completados' },
    { value: '30+', label: 'Clientes Satisfechos' },
  ];

  scrollTo(target: string): void {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.warn('No se pudo cargar el sprite de Laura:', img?.src);
    if (img) {
      img.style.visibility = 'hidden';
    }
  }
}
