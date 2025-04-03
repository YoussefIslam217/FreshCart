import { jwtDecode } from 'jwt-decode';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthonService } from '../../../core/services/authon/authon.service';
import { Router, RouterLink } from '@angular/router'; 


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  isErrorMsg : boolean = false;
  isLoading  : boolean = false;
  
  _AuthonService= inject(AuthonService);
  _Router= inject(Router);

  logInForm = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^.{6,15}$/)]),
  });

  logIn(form:any){
    this.isLoading = true;
    if(form.valid){
      this._AuthonService.signIn(form.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isErrorMsg = false;
          this.isLoading = false;

          localStorage.setItem('token',res.token);
          
          let decodedToken:any = jwtDecode(res.token);

          this._AuthonService.userName.next(decodedToken.name);

          console.log(decodedToken);

        this._AuthonService.isLogin.next(true); 


          this._Router.navigate(['/home']);

        },
        error:(err)=>{
          console.log(err);
          this.isErrorMsg = true;
          this.isLoading = false;
        }, 
      });
    } else {
      console.log('form invalid')
    }
  }

}


