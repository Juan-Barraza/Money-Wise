import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, LoginUserRequest, RegisterUserRequest } from '../../models/types/user.type';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../storageService/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.API_URL
  // public isAutenticated = signal<boolean>(false);

  constructor(private readonly http: HttpClient, private readonly storage: StorageService) {
    // this.isAuth();
  }

  public login(data: LoginUserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data)
  }

  public register(data: RegisterUserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data)
  }

  public async logout() {
    await this.storage.clear();
  }

  public async isAutenticated() {
    const token = await this.storage.get('token');
    // this.isAutenticated.set(token !== null)
    return token !== null
  }
}
