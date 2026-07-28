import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="glass-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300"
         [class.shadow-glass]="scrolled()">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-2 group">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500
                        flex items-center justify-center text-white font-bold text-lg
                        group-hover:scale-105 transition-transform duration-300 shadow-glass">
              LP
            </div>
            <span class="hidden sm:block text-xl font-bold text-violet-950">
              Porta<span class="gradient-text">folio</span>
            </span>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-1">
            @for (link of navLinks; track link.href) {
              <a [routerLink]="link.href"
                 routerLinkActive="text-violet-600 bg-violet-50"
                 [routerLinkActiveOptions]="{ exact: link.href === '/' }"
                 class="px-4 py-2 rounded-xl text-sm font-medium text-gray-600
                        hover:text-violet-600 hover:bg-violet-50 transition-all duration-200">
                {{ link.label }}
              </a>
            }
          </div>

          <!-- Auth Button -->
          <div class="hidden md:flex items-center gap-3">
            @if (authService.isAuthenticated()) {
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-50">
                  <div class="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-400
                              flex items-center justify-center text-white text-xs font-bold">
                    {{ authService.currentUser()?.name?.charAt(0) }}
                  </div>
                  <span class="text-sm font-medium text-violet-950">{{ authService.currentUser()?.name }}</span>
                </div>
                <button (click)="authService.logout()"
                        class="px-4 py-2 rounded-xl text-sm font-medium text-gray-500
                               hover:text-red-600 hover:bg-red-50 transition-all duration-200">
                  Salir
                </button>
              </div>
            } @else {
              <a routerLink="/login" class="btn-outline !py-2 !px-4 !text-sm">
                Iniciar Sesión
              </a>
              <a routerLink="/register" class="btn-primary !py-2 !px-4 !text-sm">
                Registrarse
              </a>
            }
          </div>

          <!-- Mobile Menu Button -->
          <button (click)="toggleMobile()"
                  class="md:hidden p-2 rounded-xl text-gray-600 hover:text-violet-600
                         hover:bg-violet-50 transition-all duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              @if (mobileOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"/>
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (mobileOpen()) {
        <div class="md:hidden glass-navbar border-t border-violet-100 animate-fade-in">
          <div class="px-4 py-4 space-y-1">
            @for (link of navLinks; track link.href) {
              <a [routerLink]="link.href"
                 routerLinkActive="text-violet-600 bg-violet-50"
                 (click)="mobileOpen.set(false)"
                 class="block px-4 py-3 rounded-xl text-sm font-medium text-gray-600
                        hover:text-violet-600 hover:bg-violet-50 transition-all duration-200">
                {{ link.label }}
              </a>
            }
            <div class="pt-3 border-t border-gray-100 space-y-2">
              @if (authService.isAuthenticated()) {
                <button (click)="authService.logout(); mobileOpen.set(false)"
                        class="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium
                               text-red-600 hover:bg-red-50 transition-all duration-200">
                  Cerrar Sesión
                </button>
              } @else {
                <a routerLink="/login" (click)="mobileOpen.set(false)"
                   class="block px-4 py-3 rounded-xl text-sm font-medium text-gray-600
                          hover:text-violet-600 hover:bg-violet-50 transition-all duration-200">
                  Iniciar Sesión
                </a>
                <a routerLink="/register" (click)="mobileOpen.set(false)"
                   class="block px-4 py-3 rounded-xl text-sm font-medium text-center
                          bg-violet-600 text-white hover:bg-violet-700 transition-all duration-200">
                  Registrarse
                </a>
              }
            </div>
          </div>
        </div>
      }
    </nav>
  `
})
export class NavbarComponent {
  scrolled = signal(false);
  mobileOpen = signal(false);

  navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/#proyectos', label: 'Proyectos' },
    { href: '/#habilidades', label: 'Habilidades' },
    { href: '/#recomendaciones', label: 'Recomendaciones' },
    { href: '/#contacto', label: 'Contacto' },
  ];

  constructor(public authService: AuthService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }
}
