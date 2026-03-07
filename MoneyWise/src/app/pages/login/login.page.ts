import { LoginUserRequest } from 'src/app/core/models/types/user.type';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService/auth-service';
import { ToastService } from 'src/app/core/services/toast/toast';
import { StorageService } from 'src/app/core/services/storageService/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  public loginForm!: FormGroup;
  public isLoading: boolean = false;

  constructor(private formB: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private readonly storage: StorageService,
  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loginForm.reset();
    this.loginForm.markAsUntouched();
    this.isLoading = false;
  }


  public onLogin() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    const loginData: LoginUserRequest = { email: email, password: password }
    this.authService.login(loginData).subscribe({
      next: async (response) => {
        this.isLoading = false;
        await this.storage.set('token', response.token);
        await this.storage.set('user', response.user);
        this.authService.updateUser(response.user );
        await this.toast.success('¡Bienvenido!');
        this.router.navigate(['/tabs/dashboard']);
      },
      error: async (err) => {
        await this.toast.error(err.error?.error || 'Error al iniciar sesion');
        this.isLoading = false;
      }

    }
    )
  }

  public goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  get emailError() {
    const control = this.loginForm.get('email');
    if (!control?.touched) return '';
    if (control.hasError('required')) return 'El email es requerido';
    if (control.hasError('email')) return 'Ingresa un email valido';
    return '';
  }
  get passworError() {
    const control = this.loginForm.get('password');
    if (!control?.touched) return '';
    if (control.hasError('required')) return 'La contraseña es requerida';

    return '';
  }


  private initForm() {
    this.loginForm = this.formB.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

}
