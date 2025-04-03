import { CanActivateFn, Router } from '@angular/router';
import { AuthonService } from '../../services/authon/authon.service';
import { inject } from '@angular/core';

export const notLoginGuard: CanActivateFn = (route, state) => {
   let _AuthonService = inject(AuthonService);
   let _Router = inject(Router);
 
   if (_AuthonService.isLogin.value===false){
     return true;
   }else {
     _Router.navigate(['/home']);
     return false;
   }
};
