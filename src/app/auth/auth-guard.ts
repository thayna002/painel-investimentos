import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const clientId = localStorage.getItem('clientId');

  if (!token || !clientId) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
