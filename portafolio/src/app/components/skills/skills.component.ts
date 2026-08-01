import { Component, OnInit, OnDestroy, ElementRef, viewChild, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsService } from '../../services/skills.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="habilidades" class="py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="section-title">Habilidades & <span class="gradient-text">Estadísticas</span></h2>
          <p class="section-subtitle">Tecnologías que domino y métricas de mi trayectoria profesional</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div class="card p-6 md:p-8">
            <h3 class="text-lg font-bold text-night-900 mb-6">Dominio por Tecnología</h3>
            <div class="space-y-4">
              @for (skill of skillsByFrontend(); track skill.name) {
                <div class="group">
                  <div class="flex items-center justify-between mb-1.5">
                    <div class="flex items-center gap-2">
                      <span class="text-xs">{{ skill.icon }}</span>
                      <span class="text-sm font-medium text-brown-700">{{ skill.name }}</span>
                    </div>
                    <span class="text-xs font-semibold text-olive-700">{{ skill.level }}%</span>
                  </div>
                  <div class="w-full h-2.5 rounded-full bg-cream-200 overflow-hidden">
                    <div class="h-full rounded-full bg-gradient-to-r from-olive-500 to-mustard-400 transition-all duration-1000 ease-out"
                         [style.width.%]="skill.level">
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="card p-6 md:p-8">
            <h3 class="text-lg font-bold text-night-900 mb-6">Distribución por Categoría</h3>
            <div class="space-y-5">
              @for (cat of categories; track cat.key) {
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-brown-700">{{ cat.label }}</span>
                    <span class="text-xs font-semibold text-olive-700">{{ getCategoryAvg(cat.key) }}%</span>
                  </div>
                  <div class="w-full h-3 rounded-full bg-cream-200 overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-1000 ease-out"
                         [style.width.%]="getCategoryAvg(cat.key)"
                         [style.background]="cat.color">
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <div class="card p-6 md:p-8">
          <h3 class="text-lg font-bold text-night-900 mb-6 text-center">Contribuciones por Año</h3>
          <div class="relative">
            <canvas #barChart class="w-full max-h-72"></canvas>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SkillsComponent implements OnInit, OnDestroy {
  barChartRef = viewChild.required<ElementRef<HTMLCanvasElement>>('barChart');
  private chart: Chart | null = null;

  private skillsService = inject(SkillsService);
  categories = this.skillsService.categories;

  skillsByFrontend = computed(() =>
    this.skillsService.getSkills().sort((a, b) => b.level - a.level)
  );

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => this.createChart(), 300);
  }

  ngAfterViewInit(): void {
    if (this.barChartRef()) {
      this.createChart();
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  getCategoryAvg(key: string): number {
    const skills = this.skillsService.getSkillsByCategory(key as any);
    if (skills.length === 0) return 0;
    return Math.round(skills.reduce((sum, s) => sum + s.level, 0) / skills.length);
  }

  private createChart(): void {
    const canvas = this.barChartRef()?.nativeElement;
    if (!canvas) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const contributions = this.skillsService.getContributions();

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: contributions.map(c => c.year.toString()),
        datasets: [
          {
            label: 'Proyectos',
            data: contributions.map(c => c.projects),
            backgroundColor: '#D4A373',
            borderColor: '#8B5E3C',
            borderWidth: 1,
            borderRadius: 6,
            barPercentage: 0.5,
          },
          {
            label: 'Commits',
            data: contributions.map(c => c.commits),
            backgroundColor: '#8B5E3C',
            borderColor: '#6F421F',
            borderWidth: 1,
            borderRadius: 6,
            barPercentage: 0.5,
          },
          {
            label: 'Contribuciones',
            data: contributions.map(c => c.contributions),
            backgroundColor: '#556B2F',
            borderColor: '#4A5D2E',
            borderWidth: 1,
            borderRadius: 6,
            barPercentage: 0.5,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: { family: 'Inter' }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#EAE3D2' },
            ticks: { font: { family: 'Inter' } }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Inter' } }
          }
        }
      }
    });
  }
}
