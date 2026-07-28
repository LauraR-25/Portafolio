import { Injectable } from '@angular/core';
import { Testimonial } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class TestimonialsService {
  private mockTestimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Carlos Mendoza',
      role: 'CTO',
      company: 'TechStart Inc.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      text: 'Laura superó todas nuestras expectativas. Su dominio de Angular y arquitectura de componentes transformó completamente nuestro producto. Entregó código limpio, mantenible y altamente performante.',
      rating: 5
    },
    {
      id: 2,
      name: 'María García',
      role: 'Product Manager',
      company: 'Digital Solutions',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      text: 'Trabajar con Laura fue una experiencia excepcional. Su capacidad para traducir requisitos complejos en soluciones elegantes es impresionante. Siempre entregó a tiempo y con calidad superior.',
      rating: 5
    },
    {
      id: 3,
      name: 'Roberto Sánchez',
      role: 'Lead Developer',
      company: 'InnovateTech',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
      text: 'Laura es una desarrolladora excepcional. Su conocimiento de patrones de diseño, RxJS y optimización de rendimiento hizo que nuestro proyecto escalara sin problemas. Altamente recomendada.',
      rating: 5
    },
    {
      id: 4,
      name: 'Ana Torres',
      role: 'UX Designer',
      company: 'CreativeHub',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      text: 'La colaboración con Laura fue perfecta. Implementó mis diseños con una fidelidad impresionante y sugirió mejoras de UX que realmente mejoraron la experiencia del usuario.',
      rating: 5
    }
  ];

  getTestimonials(): Testimonial[] {
    return this.mockTestimonials;
  }
}
