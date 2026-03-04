import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth-service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuth = await authService.isAutenticated()

  if (isAuth) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }

};
