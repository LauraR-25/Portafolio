import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md animate-scale-in">
        <div class="text-center mb-8">
          <a routerLink="/" class="inline-flex items-center gap-2 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500
                        flex items-center justify-center text-white font-bold text-lg">
              LP
            </div>
            <span class="text-xl font-bold text-violet-950">Porta<span class="gradient-text">folio</span></span>
          </a>
          <h2 class="text-2xl font-bold text-violet-950">Crear cuenta</h2>
          <p class="text-gray-500 text-sm mt-2">Registrate para gestionar tu perfil</p>
        </div>

        <div class="card p-8 shadow-elevated">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-5">
            @if (error()) {
              <div class="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                {{ error() }}
              </div>
            }

            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input id="name" type="text" formControlName="name"
                     class="input-field" placeholder="Tu nombre">
              @if (registerForm.get('name')?.invalid && registerForm.get('name')?.touched) {
                <p class="text-red-500 text-xs mt-1">Nombre requerido</p>
              }
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="email" type="email" formControlName="email"
                     class="input-field" placeholder="tu@email.com">
              @if (registerForm.get('email')?.invalid && registerForm.get('email')?.touched) {
                <p class="text-red-500 text-xs mt-1">Email invalido</p>
              }
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input id="password" type="password" formControlName="password"
                     class="input-field" placeholder="Minimo 6 caracteres">
              @if (registerForm.get('password')?.invalid && registerForm.get('password')?.touched) {
                <p class="text-red-500 text-xs mt-1">Minimo 6 caracteres</p>
              }
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmar password</label>
              <input id="confirmPassword" type="password" formControlName="confirmPassword"
                     class="input-field" placeholder="Repite la password">
              @if (registerForm.hasError('mismatch') && registerForm.get('confirmPassword')?.touched) {
                <p class="text-red-500 text-xs mt-1">Las passwords no coinciden</p>
              }
            </div>

            <button type="submit" [disabled]="registerForm.invalid || loading()"
                    class="btn-primary w-full inline-flex items-center justify-center gap-2">
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

          <p class="text-center text-sm text-gray-500 mt-6">
            Ya tienes cuenta?
            <a routerLink="/login" class="text-violet-600 font-semibold hover:text-violet-700">Inicia Sesion</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { mismatch: true };
    }
    return null;
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    const result = await this.authService.register(this.registerForm.value);
    this.loading.set(false);

    if (result.success) {
      this.router.navigate(['/']);
    } else {
      this.error.set(result.message ?? 'Error al registrarse');
    }
  }
}
