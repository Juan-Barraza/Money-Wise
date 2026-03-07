import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserRequest } from 'src/app/core/models/types/user.type';
import { AuthService } from 'src/app/core/services/authService/auth-service';
import { StorageService } from 'src/app/core/services/storageService/storage';
import { ToastService } from 'src/app/core/services/toast/toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  public registerForm!: FormGroup;
  public isLoading: boolean = false;

  constructor(private formB: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private readonly storage: StorageService,
    private toast: ToastService,

  ) {
    this.initForm();
  }

  ngOnInit() {
  }


  public onRegister() {
    if (this.registerForm.invalid) return;

    const { name, lastName, email, password } = this.registerForm.value;
    const registerData: RegisterUserRequest = {
      name: name, last_name: lastName,
      email: email, password: password
    }
    this.authService.register(registerData).subscribe({
      next: async (response) => {
        await this.storage.set('token', response.token);
        await this.storage.set('user', response.user);
        this.authService.updateUser(response.user);
        await this.toast.success('¡Registro exitoso!');
        this.router.navigate(['/tabs/dashboard']);
        this.registerForm.reset();
      },
      error: async (err) => {
        await this.toast.error(err.error?.error || 'Error al iniciar sesion');
        this.isLoading = false;
      }
    })
  }

  public goToLogin() {
    this.router.navigate(['/auth/login']);
  }


  get nameError() {
    const control = this.registerForm.get('name');
    if (!control?.touched) return '';
    if (control.hasError('required')) return 'El nombre es requerido';
    if (control.hasError('minlength')) return 'El nombre debe ser minimo de 3 caracteres';
    return '';
  }
  get lastnameError() {
    const control = this.registerForm.get('lastName');
    if (!control?.touched) return '';
    if (control.hasError('required')) return 'El apellido es requerido';
    if (control.hasError('minlength')) return 'El apellido debe ser minimo de 3 caracteres';
    return '';
  }

  get emailError() {
    const control = this.registerForm.get('email');
    if (!control?.touched) return '';
    if (control.hasError('required')) return 'El email es requerido';
    if (control.hasError('email')) return 'Ingresa un email valido';
    return '';
  }

  get passworError() {
    const control = this.registerForm.get('password');
    if (!control?.touched) return '';
    if (control.hasError('required')) return 'El la contraseña es requerido';
    if (control.hasError('minlength')) return 'El contraseña debe ser minimo de 8 caracteres';
    return '';
  }


  private initForm() {
    this.registerForm = this.formB.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

}
