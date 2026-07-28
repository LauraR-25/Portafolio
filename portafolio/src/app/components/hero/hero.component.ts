import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="relative min-h-screen flex items-center overflow-hidden pt-20">
      <!-- Background decoration -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-100/40 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                    bg-gradient-to-r from-violet-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Text Content -->
          <div class="space-y-8 animate-slide-up">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700
                        text-sm font-medium">
              <span class="w-2 h-2 rounded-full bg-violet-500 animate-pulse-soft"></span>
              Disponible para proyectos
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-violet-950 leading-tight">
              Hola, soy
              <span class="block gradient-text">Laura</span>
              <span class="text-3xl sm:text-4xl lg:text-5xl text-gray-500 font-bold">
                Desarrolladora Full Stack
              </span>
            </h1>

            <p class="text-lg text-gray-500 max-w-lg leading-relaxed">
              Creo experiencias digitales excepcionales con código limpio, arquitectura escalable
              y diseño intuitivo. Especializada en Angular y ecosistemas modernos.
            </p>

            <div class="flex flex-wrap gap-4">
              <a routerLink="/#proyectos" class="btn-primary inline-flex items-center gap-2">
                <span>Ver Proyectos</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a routerLink="/#contacto" class="btn-outline inline-flex items-center gap-2">
                <span>Contactar</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              @for (stat of stats; track stat.label) {
                <div class="text-center">
                  <div class="text-2xl sm:text-3xl font-extrabold gradient-text">{{ stat.value }}</div>
                  <div class="text-xs sm:text-sm text-gray-400 mt-1">{{ stat.label }}</div>
                </div>
              }
            </div>
          </div>

          <!-- Hero Visual -->
          <div class="relative hidden lg:flex items-center justify-center animate-fade-in">
            <div class="relative w-80 h-80">
              <!-- Profile image area -->
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600
                          shadow-elevated animate-float overflow-hidden">
                <div class="absolute inset-2 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-50
                            flex items-center justify-center">
                  <div class="text-center">
                    <div class="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500
                                to-purple-500 flex items-center justify-center shadow-glass">
                      <span class="text-4xl text-white font-bold">LP</span>
                    </div>
                    <p class="text-violet-700 font-semibold">Full Stack Developer</p>
                    <p class="text-violet-400 text-sm">Angular &bull; TypeScript &bull; Node.js</p>
                  </div>
                </div>
              </div>

              <!-- Floating badges -->
              <div class="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-white shadow-card
                          text-sm font-medium text-violet-600 animate-float" style="animation-delay: 0.5s">
                🚀 Angular Expert
              </div>
              <div class="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-white shadow-card
                          text-sm font-medium text-violet-600 animate-float" style="animation-delay: 1s">
                ⚡ TypeScript
              </div>
              <div class="absolute top-1/2 -right-8 px-4 py-2 rounded-xl bg-white shadow-card
                          text-sm font-medium text-violet-600 animate-float" style="animation-delay: 1.5s">
                🎨 UI/UX Design
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                  text-violet-400 animate-bounce">
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
}
