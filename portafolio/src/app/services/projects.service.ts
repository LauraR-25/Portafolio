import { Injectable, signal } from '@angular/core';
import { Project, ProjectCategory, ProjectCategoryInfo } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private projectsSignal = signal<Project[]>([]);
  projects = this.projectsSignal.asReadonly();

  categories: ProjectCategoryInfo[] = [
    { key: 'all', label: 'Todos', icon: 'M4 6h16M4 12h16M4 18h16' },
    { key: 'web', label: 'Web', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 019-9' },
    { key: 'mobile', label: 'Mobile', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { key: 'backend', label: 'Backend', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01' },
    { key: 'distributed', label: 'Distribuidos', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' }
  ];

  private mockProjects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Plataforma de comercio electrónico completa con panel de administración, carrito de compras en tiempo real y pasarela de pagos integrada.',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
      technologies: ['Angular 18', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe API', 'NgRx'],
      githubUrl: 'https://github.com/example/ecommerce',
      liveUrl: 'https://demo-ecommerce.com',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      details: {
        architecture: 'Arquitectura modular con NgRx para gestión de estado. Microservicios backend con Node.js y Express. Base de datos MongoDB con Mongoose ORM.',
        challenges: 'Sincronización del carrito en tiempo real entre múltiples pestañas. Optimización de renders con ChangeDetectionStrategy.OnPush. Integración segura de pagos con Stripe.',
        solutions: 'Uso de BroadcastChannel API para sincronización. Memoización selectiva con createSelector de NgRx. Webhooks de Stripe con verificación de firmas.',
        role: 'Desarrolladora Web',
        duration: '3 meses'
      },
      featured: true
    },
    {
      id: 2,
      title: 'Fitness Tracker App',
      description: 'Aplicación móvil multiplataforma para seguimiento de rutinas de ejercicio, nutrición y progreso físico con gráficos interactivos.',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=500&fit=crop',
      technologies: ['Ionic', 'Angular', 'Capacitor', 'Firebase', 'Chart.js', 'RxJS'],
      githubUrl: 'https://github.com/example/fitness-tracker',
      liveUrl: 'https://fitness-demo.com',
      details: {
        architecture: 'Ionic Angular con Capacitor para nativo. Firebase como BaaS (Auth, Firestore, Storage). Arquitectura por features con lazy loading.',
        challenges: 'Performance en listas grandes de ejercicios. Sincronización offline-first con Firestore. Notificaciones push personalizadas.',
        solutions: 'Virtual scrolling con cdk-virtual-scroll. Firestore offline persistence y sync automático. Capacitor Local Notifications con scheduling.',
        role: 'Desarrolladora Frontend & Mobile',
        duration: '4 meses'
      },
      featured: true
    },
    {
      id: 3,
      title: 'API Gateway Microservicio',
      description: 'Gateway de API con enrutamiento, autenticación JWT, rate limiting y monitoreo en tiempo real para arquitectura de microservicios.',
      category: 'backend',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
      technologies: ['NestJS', 'TypeScript', 'Redis', 'Docker', 'PostgreSQL', 'Swagger'],
      githubUrl: 'https://github.com/example/api-gateway',
      details: {
        architecture: 'NestJS con arquitectura hexagonal. Redis para caché y rate limiting. Docker Compose para orquestación. Circuit breaker pattern con opossum.',
        challenges: 'Manejo de carga Balance entre servicios. Cacheo inteligente de respuestas. Monitoreo distribuido con métricas.',
        solutions: 'Implementación de load balancing round-robin con health checks. Estrategia de cache invalidation por TTL y eventos. Integración con Prometheus y Grafana.',
        role: 'Arquitecto Backend',
        duration: '2 meses'
      },
      featured: true
    },
    {
      id: 4,
      title: 'Sistema de Citas Médicas',
      description: 'Sistema distribuido para gestión de citas médicas con balanceo de carga, cola de mensajes y comunicación en tiempo real.',
      category: 'distributed',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
      technologies: ['Angular', 'Node.js', 'RabbitMQ', 'WebSocket', 'PostgreSQL', 'Docker Swarm'],
      githubUrl: 'https://github.com/example/medical-appointments',
      details: {
        architecture: 'Microservicios: Auth, Citas, Notificaciones, Reportes. RabbitMQ para comunicación asíncrona. WebSocket para tiempo real. Docker Swarm para orquestación.',
        challenges: 'Consistencia de datos entre servicios. Manejo de concurrencia en reservas simultáneas. Escalado horizontal del servicio de notificaciones.',
        solutions: 'Saga pattern para transacciones distribuidas. Optimistic locking con versionado de registros. Auto-scaling basado en métricas de cola RabbitMQ.',
        role: 'Desarrolladora Web & DevOps',
        duration: '5 meses'
      },
      featured: false
    },
    {
      id: 5,
      title: 'Dashboard Analytics',
      description: 'Panel de administración con visualización de datos en tiempo real, reportes exportables y gestión de usuarios con roles.',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      technologies: ['Angular', 'D3.js', 'Material UI', 'Express', 'MongoDB', 'Socket.IO'],
      githubUrl: 'https://github.com/example/analytics-dashboard',
      liveUrl: 'https://analytics-demo.com',
      details: {
        architecture: 'Angular Material con custom theming. D3.js para gráficos custom. Socket.IO para actualizaciones en tiempo real. RBAC para control de acceso.',
        challenges: 'Renderizado de gráficos con datasets grandes. Actualizaciones en tiempo real sin degradar performance. Exportación de reportes a PDF.',
        solutions: 'Canvas renderer de D3 para datasets >10K puntos. Throttling de eventos Socket.IO con requestAnimationFrame. pdfmake para generación server-side.',
        role: 'Desarrollador Frontend',
        duration: '2.5 meses'
      },
      featured: false
    },
    {
      id: 6,
      title: 'Chat Application',
      description: 'Aplicación de mensajería en tiempo real con salas, typing indicators, envío de archivos y cifrado end-to-end.',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=500&fit=crop',
      technologies: ['React Native', 'TypeScript', 'Socket.IO', 'Firebase', 'E2E Encryption'],
      githubUrl: 'https://github.com/example/chat-app',
      details: {
        architecture: 'React Native con Context API. Socket.IO client para realtime. Firebase para auth y storage. Libsignal para E2E encryption.',
        challenges: 'Cifrado end-to-end sin afectar UX. Sincronización de mensajes offline. Gestión de archivos multimedia grandes.',
        solutions: 'Protocolo Signal adaptado con clave pública por dispositivo. Cola de mensajes pendientes con retry automático. Upload chunked con progreso.',
        role: 'Desarrollador Mobile',
        duration: '3 meses'
      },
      featured: false
    }
  ];

  constructor() {
    this.projectsSignal.set(this.mockProjects);
  }

  getProjects(): Project[] {
    return this.mockProjects;
  }

  getFeaturedProjects(): Project[] {
    return this.mockProjects.filter(p => p.featured);
  }

  getProjectsByCategory(category: ProjectCategory): Project[] {
    if (category === 'all') return this.mockProjects;
    return this.mockProjects.filter(p => p.category === category);
  }

  getProjectById(id: number): Project | undefined {
    return this.mockProjects.find(p => p.id === id);
  }
}
