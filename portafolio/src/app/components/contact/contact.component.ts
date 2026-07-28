import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contacto" class="py-16 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="section-title">Tienes un <span class="gradient-text">Proyecto</span> en Mente?</h2>
          <p class="section-subtitle">Estoy abierto a nuevas oportunidades. Contactame y hablemos de como puedo ayudarte.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div class="space-y-6">
            <div class="card p-6 flex items-start gap-4 hover:shadow-card-hover transition-shadow duration-300">
              <div class="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-violet-950 mb-1">Email</h4>
                <p class="text-gray-500 text-sm">laura&#64;portafolio.com</p>
              </div>
            </div>

            <div class="card p-6 flex items-start gap-4 hover:shadow-card-hover transition-shadow duration-300">
              <div class="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-violet-950 mb-1">Ubicacion</h4>
                <p class="text-gray-500 text-sm">Ciudad de Mexico, MX</p>
              </div>
            </div>

            <div class="card p-6 flex items-start gap-4 hover:shadow-card-hover transition-shadow duration-300">
              <div class="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-violet-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-violet-950 mb-1">GitHub</h4>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-violet-600 text-sm hover:underline">github.com/laura-dev</a>
              </div>
            </div>
          </div>

          <div class="card p-6 md:p-8">
            <h3 class="text-lg font-bold text-violet-950 mb-6">Enviame un mensaje</h3>
            <form (ngSubmit)="onSubmit()" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input type="text" id="name" [(ngModel)]="formData.name" name="name" required class="input-field" placeholder="Tu nombre">
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" [(ngModel)]="formData.email" name="email" required class="input-field" placeholder="tu@email.com">
                </div>
              </div>
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                <input type="text" id="subject" [(ngModel)]="formData.subject" name="subject" required class="input-field" placeholder="Asunto del mensaje">
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea id="message" rows="5" [(ngModel)]="formData.message" name="message" required class="input-field resize-none" placeholder="Describe tu proyecto..."></textarea>
              </div>
              <button type="submit" [disabled]="sent()" class="btn-primary w-full inline-flex items-center justify-center gap-2">
                @if (sent()) {
                  <span>Mensaje enviado</span>
                } @else {
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  <span>Enviar mensaje</span>
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  sent = signal(false);

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit(): void {
    this.sent.set(true);
    setTimeout(() => {
      this.sent.set(false);
      this.formData = { name: '', email: '', subject: '', message: '' };
    }, 3000);
  }
}
