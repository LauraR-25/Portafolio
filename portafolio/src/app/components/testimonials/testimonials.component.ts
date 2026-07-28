import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsService } from '../../services/testimonials.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="recomendaciones" class="py-16 md:py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="section-title">Recomendaciones</h2>
          <p class="section-subtitle">Lo que dicen colegas y clientes sobre mi trabajo</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (testimonial of testimonials; track testimonial.id; let i = $index) {
            <div class="card p-6 md:p-8 animate-slide-up" [style.animation-delay]="(i * 0.1) + 's'">
              <div class="flex items-start gap-4 mb-4">
                <img [src]="testimonial.avatar" [alt]="testimonial.name"
                     class="w-12 h-12 rounded-xl bg-violet-100">
                <div>
                  <h4 class="font-semibold text-violet-950">{{ testimonial.name }}</h4>
                  <p class="text-sm text-gray-500">{{ testimonial.role }} en {{ testimonial.company }}</p>
                </div>
                <div class="ml-auto flex gap-0.5">
                  @for (star of getStars(testimonial.rating); track star) {
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  }
                </div>
              </div>
              <p class="text-gray-600 text-sm leading-relaxed italic">"{{ testimonial.text }}"</p>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent {
  private testimonialsService = inject(TestimonialsService);
  testimonials = this.testimonialsService.getTestimonials();

  constructor() {}

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
