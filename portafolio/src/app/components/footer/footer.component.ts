import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-night-900 text-cream-100">
      <!-- Wave separator -->
      <div class="relative -mt-px">
        <svg class="w-full h-16 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="#1E1B2E"
                d="M0,40 C360,100 720,0 1080,50 C1260,75 1380,25 1440,40 L1440,100 L0,100 Z"/>
        </svg>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <!-- Brand -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-olive-600 to-mustard-500
                          flex items-center justify-center text-cream-50 font-bold text-lg shadow-glass">
                LP
              </div>
              <span class="text-xl font-bold">Porta<span class="text-mustard-400">folio</span></span>
            </div>
            <p class="text-cream-200/80 text-sm leading-relaxed max-w-sm mb-6">
              Desarrolladora Web / Estudiante de Ingeniería de Computación, apasionada por crear
              experiencias digitales excepcionales. Especializada en Angular, TypeScript y
              arquitecturas escalables.
            </p>

            <!-- Métricas dinámicas -->
            <div class="flex items-center gap-6 mb-6">
              @for (metric of metrics; track metric.label) {
                <div class="text-center">
                  <div class="text-2xl font-extrabold gradient-text">{{ metric.value }}</div>
                  <div class="text-[11px] text-cream-200/70 mt-0.5">{{ metric.label }}</div>
                </div>
              }
            </div>

            <div class="flex items-center gap-3">
              @for (social of socialLinks; track social.label) {
                <a [href]="social.url" target="_blank" rel="noopener noreferrer"
                   class="w-10 h-10 rounded-xl bg-brown-800/50 flex items-center justify-center
                          text-cream-200 hover:bg-mustard-500 hover:text-night-900
                          border border-mustard-800/40
                          transition-all duration-300 hover:-translate-y-0.5"
                   [attr.aria-label]="social.label">
                  <svg class="w-5 h-5" fill="currentColor" [attr.viewBox]="social.viewBox">
                    <path [attr.d]="social.path"/>
                  </svg>
                </a>
              }
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-mustard-300 mb-4">
              Navegación
            </h3>
            <ul class="space-y-2">
              @for (link of quickLinks; track link.target) {
                <li>
                  <a [href]="'#' + link.target"
                     (click)="$event.preventDefault(); scrollTo(link.target)"
                     class="text-cream-200/80 hover:text-mustard-300 text-sm transition-colors duration-200">
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-mustard-300 mb-4">
              Contacto
            </h3>
            <ul class="space-y-3">
              @for (item of contactItems; track item.label) {
                <li class="flex items-center gap-2 text-cream-200/80 text-sm">
                  <svg class="w-4 h-4 text-mustard-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="item.icon"/>
                  </svg>
                  <a [attr.href]="item.href" class="hover:text-mustard-300 transition-colors duration-200">
                    {{ item.value }}
                  </a>
                </li>
              }
            </ul>
          </div>
        </div>

        <!-- Bottom -->
        <div class="mt-12 pt-8 border-t border-mustard-800/50 flex flex-col sm:flex-row
                    items-center justify-between gap-4">
          <p class="text-cream-200/60 text-sm">
            &copy; {{ currentYear }} Portafolio. Todos los derechos reservados.
          </p>
          <p class="text-cream-200/40 text-xs">
            Diseñado con Angular &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  metrics = [
    { value: '5+', label: 'Años de experiencia' },
    { value: '50+', label: 'Proyectos' },
    { value: '30+', label: 'Clientes' },
  ];

  quickLinks = [
    { target: 'inicio', label: 'Inicio' },
    { target: 'proyectos', label: 'Proyectos' },
    { target: 'habilidades', label: 'Habilidades' },
    { target: 'recomendaciones', label: 'Recomendaciones' },
    { target: 'contacto', label: 'Contacto' },
  ];

  contactItems = [
    {
      label: 'Email',
      value: 'laura@portafolio.com',
      href: 'mailto:laura@portafolio.com',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
      label: 'Ubicación',
      value: 'Ciudad de México, MX',
      href: 'https://maps.google.com/?q=Ciudad+de+Mexico',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      label: 'GitHub',
      value: 'github.com/laura-dev',
      href: 'https://github.com/laura-dev',
      icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z'
    }
  ];

  socialLinks = [
    {
      label: 'GitHub',
      url: 'https://github.com/laura-dev',
      viewBox: '0 0 24 24',
      path: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z'
    },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/laura-dev',
      viewBox: '0 0 24 24',
      path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
    },
    {
      label: 'Email',
      url: 'mailto:laura@portafolio.com',
      viewBox: '0 0 24 24',
      path: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
    }
  ];

  scrollTo(target: string): void {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
