import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../services/storageService/storage';

export const publicGuard: CanActivateFn = async (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);

  const token = await storage.get('token');
  if (token) {
    router.navigate(['/home']);
    return false
  }
  return true;
};
