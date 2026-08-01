import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen relative overflow-hidden bg-cream-100 flex items-center justify-center px-4 py-12 sm:px-6">
      <!-- Background decoration -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-32 -right-32 w-96 h-96 bg-mustard-200/40 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-32 w-[28rem] h-[28rem] bg-olive-200/50 rounded-full blur-3xl"></div>
        <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-brown-200/40 rounded-full blur-3xl"></div>
      </div>

      <div class="relative w-full max-w-lg animate-scale-in">
        <div class="text-center mb-6">
          <div class="inline-flex items-center gap-2">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-olive-600 to-mustard-500
                        flex items-center justify-center text-cream-50 font-bold text-lg shadow-glass">
              LP
            </div>
            <span class="text-xl font-bold text-night-900">Porta<span class="gradient-text">folio</span></span>
          </div>
        </div>

        <div class="flip-card w-full">
          <div class="flip-card-inner min-h-[400px] md:min-h-[460px]" [class.flipped]="flipped()">

            <!-- SIDE A: Iniciar Sesión -->
            <div class="flip-card-face flip-card-front">
              <div class="relative flex flex-row items-center w-full h-full max-w-lg bg-cream-100 rounded-3xl
                          shadow-elevated overflow-visible p-2 border border-mustard-300/60">

                <!-- COLUMNA IZQUIERDA: espacio exclusivo para el sprite -->
                <div class="relative w-44 flex-shrink-0 h-full min-h-[360px] flex items-center justify-center">
                  <img src="/assets/images/sprites/laura.png" alt="Laura frente"
                       class="absolute -left-6 -bottom-4 h-[115%] max-w-none object-contain drop-shadow-xl z-10 select-none pointer-events-none"
                       (error)="onImageError($event)">
                </div>

                <!-- COLUMNA DERECHA: formulario completamente legible -->
                <div class="flex-1 p-6 md:p-8 md:pl-2 z-20">
                  <h2 class="text-2xl font-bold text-night-900 mb-1">Iniciar Sesión</h2>
                  <p class="text-sm text-brown-500 mb-5">Ingresa para descubrir mi portafolio</p>

                  <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="flex flex-col gap-3.5">
                    @if (error()) {
                      <div class="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
                        {{ error() }}
                      </div>
                    }

                    <div>
                      <label for="login-name" class="block text-sm font-medium text-brown-700 mb-1">Nombre</label>
                      <input id="login-name" type="text" formControlName="name"
                             class="input-field" placeholder="Tu nombre">
                      @if (loginForm.get('name')?.invalid && loginForm.get('name')?.touched) {
                        <p class="text-red-600 text-xs mt-1">El nombre es requerido</p>
                      }
                    </div>

                    <div>
                      <label for="login-password" class="block text-sm font-medium text-brown-700 mb-1">Contraseña</label>
                      <input id="login-password" type="password" formControlName="password"
                             class="input-field" placeholder="Mínimo 6 caracteres">
                      @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
                        <p class="text-red-600 text-xs mt-1">Mínimo 6 caracteres</p>
                      }
                    </div>

                    <button type="submit" [disabled]="loginForm.invalid || loading()"
                            class="btn-primary w-full">
                      @if (loading()) {
                        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        <span>Ingresando...</span>
                      } @else {
                        <span>Ingresar</span>
                      }
                    </button>
                  </form>

                  <button type="button" (click)="toggle()"
                          class="mt-5 w-full text-center text-sm font-semibold text-mustard-600
                                 hover:text-mustard-500 hover:underline underline-offset-4
                                 transition-colors duration-200">
                    ¿No tienes cuenta? Crear cuenta
                  </button>
                </div>
              </div>
            </div>

            <!-- SIDE B: Crear Cuenta -->
            <div class="flip-card-face flip-card-back">
              <div class="relative flex flex-row items-center w-full h-full max-w-lg bg-cream-100 rounded-3xl
                          shadow-elevated overflow-visible p-2 border border-mustard-300/60">

                <!-- COLUMNA IZQUIERDA: espacio exclusivo para el sprite -->
                <div class="relative w-44 flex-shrink-0 h-full min-h-[360px] flex items-center justify-center">
                  <img src="/assets/images/sprites/laura-espalda.png" alt="Laura espalda"
                       class="absolute -left-6 -bottom-4 h-[115%] max-w-none object-contain drop-shadow-xl z-10 select-none pointer-events-none"
                       (error)="onImageError($event)">
                </div>

                <!-- COLUMNA DERECHA: formulario completamente legible -->
                <div class="flex-1 p-6 md:p-8 md:pl-2 z-20">
                  <h2 class="text-2xl font-bold text-night-900 mb-1">Crear cuenta</h2>
                  <p class="text-sm text-brown-500 mb-5">Regístrate para acceder a mi portafolio</p>

                  <form [formGroup]="registerForm" (ngSubmit)="onRegister()" class="flex flex-col gap-3.5">
                    @if (error()) {
                      <div class="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
                        {{ error() }}
                      </div>
                    }

                    <div>
                      <label for="register-name" class="block text-sm font-medium text-brown-700 mb-1">Nombre</label>
                      <input id="register-name" type="text" formControlName="name"
                             class="input-field" placeholder="Tu nombre">
                      @if (registerForm.get('name')?.invalid && registerForm.get('name')?.touched) {
                        <p class="text-red-600 text-xs mt-1">El nombre es requerido</p>
                      }
                    </div>

                    <div>
                      <label for="register-email" class="block text-sm font-medium text-brown-700 mb-1">Correo</label>
                      <input id="register-email" type="email" formControlName="email"
                             class="input-field" placeholder="tu@email.com">
                      @if (registerForm.get('email')?.invalid && registerForm.get('email')?.touched) {
                        <p class="text-red-600 text-xs mt-1">Correo inválido</p>
                      }
                    </div>

                    <div>
                      <label for="register-password" class="block text-sm font-medium text-brown-700 mb-1">Contraseña</label>
                      <input id="register-password" type="password" formControlName="password"
                             class="input-field" placeholder="Mínimo 6 caracteres">
                      @if (registerForm.get('password')?.invalid && registerForm.get('password')?.touched) {
                        <p class="text-red-600 text-xs mt-1">Mínimo 6 caracteres</p>
                      }
                    </div>

                    <button type="submit" [disabled]="registerForm.invalid || loading()"
                            class="btn-primary w-full">
                      @if (loading()) {
                        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        <span>Registrando...</span>
                      } @else {
                        <span>Crear cuenta</span>
                      }
                    </button>
                  </form>

                  <button type="button" (click)="toggle()"
                          class="mt-5 w-full text-center text-sm font-semibold text-mustard-600
                                 hover:text-mustard-500 hover:underline underline-offset-4
                                 transition-colors duration-200">
                    ¿Ya tienes cuenta? Iniciar sesión
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class AuthComponent {
  flipped = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    const segment = this.route.snapshot.url[0]?.path;
    this.flipped.set(segment === 'register');
  }

  toggle(): void {
    this.flipped.update(v => !v);
    this.error.set(null);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.warn('No se pudo cargar el sprite de Laura:', img?.src);
    if (img) {
      img.style.visibility = 'hidden';
    }
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    const result = await this.authService.login(this.loginForm.value);
    this.loading.set(false);

    if (result.success) {
      this.router.navigate(['/home']);
    } else {
      this.error.set(result.message ?? 'Error al iniciar sesión');
    }
  }

  async onRegister(): Promise<void> {
    if (this.registerForm.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    const result = await this.authService.register(this.registerForm.value);
    this.loading.set(false);

    if (result.success) {
      this.router.navigate(['/home']);
    } else {
      this.error.set(result.message ?? 'Error al registrarse');
    }
  }
}
