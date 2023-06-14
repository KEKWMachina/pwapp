import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const loginGuardFunction: CanActivateFn = () => {
  const authServie = inject(LoginService);
  const router = inject(Router);

  if (!authServie.isAuthenticatedUser) {
    router.navigate(['/home'])
  }

  return authServie.isAuthenticatedUser;
};
