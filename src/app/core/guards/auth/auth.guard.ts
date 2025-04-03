import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthonService } from '../../services/authon/authon.service';
import { isPlatformBrowser } from '@angular/common';
import { catchError, EMPTY, first, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  let _AuthonService = inject(AuthonService);
  let _Router = inject(Router);
  let pid = inject(PLATFORM_ID)

  if(isPlatformBrowser(pid)){
    return _AuthonService.verifyToken(localStorage.getItem('token')).pipe(
      first(),
      map((res)=>{
        if(res.message==='verified'){
          _AuthonService.isLogin.next(true);
          return true;
        }
        else{
          _AuthonService.isLogin.next(false);
          return false;
        }
      }),
      catchError(()=>{
        _AuthonService.isLogin.next(false);
        _Router.navigate(['/login']);
        return EMPTY;
      })
    );
  }else {
    return true;
  }
  
};
