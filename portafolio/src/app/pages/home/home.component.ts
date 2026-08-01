import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    CarouselComponent,
    ProjectsComponent,
    SkillsComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <div class="relative min-h-screen">
      <!-- Capa posterior: video de fondo (preparada para uso futuro) -->
      <div class="fixed inset-0 z-0 overflow-hidden">
        @if (backgroundVideo) {
          <video autoplay loop muted playsinline [src]="backgroundVideo"
                 class="w-full h-full object-cover"></video>
        }
        <div class="absolute inset-0 bg-gradient-to-b
                    from-cream-100/80 via-cream-100/90 to-night-900/85"></div>
      </div>

      <div class="relative z-10">
        <app-navbar></app-navbar>
        <main>
          <app-hero></app-hero>
          <app-carousel></app-carousel>
          <app-projects></app-projects>
          <app-skills></app-skills>
          <app-testimonials></app-testimonials>
          <app-contact></app-contact>
        </main>
        <app-footer></app-footer>
      </div>
    </div>
  `
})
export class HomeComponent {
  backgroundVideo = '';
}
