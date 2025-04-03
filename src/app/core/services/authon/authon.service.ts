import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import {  LoginData } from '../../../shared/interfaces/login-data';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { log } from 'console';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthonService {

  pid = inject(PLATFORM_ID);
  r=inject(Router);
  isLogin : BehaviorSubject<boolean> = new BehaviorSubject(false);
  userName : BehaviorSubject<string> =new BehaviorSubject('');
  
  
  constructor(private _HttpClient:HttpClient) {
    if(isPlatformBrowser(this.pid)){
      if(localStorage.getItem('token')!==null){
        this.doVerifyToken();
        this.setUserName();
      }else{
        this.r.navigate(['/login']);
      }
    }
  }

  setUserName(){
    let token:any = localStorage.getItem('token')
    let decodedToken:any = jwtDecode(token);
    this.userName.next(decodedToken.name);
  }

  verifyToken(t:any) :Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken',{
      headers:{
        token:t,
      }
    })
  }

  doVerifyToken(){
    this.verifyToken(localStorage.getItem('token')).subscribe({
      next:(res)=>{
        if(res.message=='verified'){
          console.log('hello from verify token');
          console.log(res);
          this.isLogin.next(true);
        }
      },
      error:()=>{
        this.isLogin.next(false);
        this.r.navigate(['/login']);
      },
    });
  }

  signUp(userData:User):Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData);
  }

  signIn(logInData:LoginData):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',logInData);
  }

  setEmailVerify(data:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data )
  }

  setCodeVerify(data:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', data )
  }

  
  setResetPassword(data:object):Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', data )
  }
  

}
