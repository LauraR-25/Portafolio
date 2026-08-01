import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSignal = signal<User | null>(null);

  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = computed(() => this.currentUserSignal() !== null);
  isAdmin = computed(() => this.currentUserSignal()?.role === 'admin');

  private mockUsers: (User & { password: string })[] = [
    {
      id: 1,
      email: 'admin@portafolio.com',
      password: 'admin123',
      name: 'Laura',
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura'
    },
    {
      id: 2,
      email: 'user@portafolio.com',
      password: 'user123',
      name: 'Visitante',
      role: 'user',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'
    }
  ];

  constructor(private router: Router) {
    this.loadSession();
  }

  private loadSession(): void {
    const stored = localStorage.getItem('portafolio_user');
    if (stored) {
      try {
        this.currentUserSignal.set(JSON.parse(stored));
      } catch {
        localStorage.removeItem('portafolio_user');
      }
    }
  }

  login(request: LoginRequest): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.mockUsers.find(
          u => u.name.toLowerCase() === request.name.toLowerCase()
            && u.password === request.password
        );
        if (user) {
          const { password, ...userWithoutPassword } = user;
          const response: AuthResponse = {
            success: true,
            user: userWithoutPassword,
            token: 'mock-jwt-token-' + Date.now()
          };
          this.currentUserSignal.set(userWithoutPassword);
          localStorage.setItem('portafolio_user', JSON.stringify(userWithoutPassword));
          resolve(response);
        } else {
          resolve({ success: false, message: 'Credenciales incorrectas' });
        }
      }, 800);
    });
  }

  register(request: RegisterRequest): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const exists = this.mockUsers.some(u => u.email === request.email);
        if (exists) {
          resolve({ success: false, message: 'El email ya está registrado' });
          return;
        }
        const newUser: User & { password: string } = {
          id: this.mockUsers.length + 1,
          email: request.email,
          password: request.password,
          name: request.name,
          role: 'user',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${request.name}`
        };
        this.mockUsers.push(newUser);
        const { password, ...userWithoutPassword } = newUser;
        const response: AuthResponse = {
          success: true,
          user: userWithoutPassword,
          token: 'mock-jwt-token-' + Date.now()
        };
        this.currentUserSignal.set(userWithoutPassword);
        localStorage.setItem('portafolio_user', JSON.stringify(userWithoutPassword));
        resolve(response);
      }, 800);
    });
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('portafolio_user');
    this.router.navigate(['/login']);
  }
}
