import { inject} from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';

import { AuthService } from '../services/auth.service';

//inyecctio dependencia a manera funcional
export const AdminGuard : CanActivateFn = () =>  {

   const loginService = inject(AuthService);
  const  router = inject(Router);

    if (loginService.isLoggedIn() && loginService.getUserRole() == 'ROLE_ADMIN') {
      return true;
    }
    router.navigate(['login']);
      return false;
   
  }



