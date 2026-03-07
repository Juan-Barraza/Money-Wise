import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, IUser, LoginUserRequest, RegisterUserRequest } from '../../models/types/user.type';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../storageService/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.API_URL
  // public isAutenticated = signal<boolean>(false);
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable(); // this is a obserbable are continuing and variable global

  constructor(private readonly http: HttpClient, private storage: StorageService) {
    // this.isAuth();
    this.loadUserFromStorage();
  }

  public login(data: LoginUserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data)
  }

  public register(data: RegisterUserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data)
  }

  public async logout() {
    await this.storage.clear();
    await this.storage.remove('token');
    await this.storage.remove('user');
    await new Promise(resolve => setTimeout(resolve, 200))
  }

  public async isAutenticated() {
    const token = await this.storage.get('token');
    // this.isAutenticated.set(token !== null)
    return token !== null
  }

  public getCurrentUser(): IUser | null {
    return this.currentUserSubject.getValue();
  }

  public updateUser(user: IUser) {
    this.currentUserSubject.next(user);
  }


  private async loadUserFromStorage() {
    const user = await this.storage.get('user');
    const token = await this.storage.get('token');
    if (user && token) {
      this.currentUserSubject.next(user);
    }
  }

}
