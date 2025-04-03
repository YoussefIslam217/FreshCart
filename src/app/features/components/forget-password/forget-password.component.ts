import { Router } from '@angular/router';
import { AuthonService } from './../../../core/services/authon/authon.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  step : number = 1;
  isLoading : boolean = false;

  _AuthonService = inject(AuthonService);
  _Router = inject(Router);

  verifyEmail = new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.email]),
  })

  verifyCode = new FormGroup({
    resetCode : new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)]),
  })

  resetPassword = new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.email]),
    newPassword: new FormControl(null,[Validators.required,Validators.pattern(/^.{6,15}$/)]),
  })

  verifyEmailSubmit(){
    this.isLoading = true;
    let emailValue:any = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);

    this._AuthonService.setEmailVerify(this.verifyEmail.value).subscribe({
      next:(res)=>{
        if(res.statusMsg === 'success'){
          this.isLoading = false;
          this.step = 2;
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  verifyCodeSubmit(){
    this.isLoading = true;
    this._AuthonService.setCodeVerify(this.verifyCode.value).subscribe({
      next:(res)=>{
        if(res.status === 'Success'){
          this.isLoading = false;
          this.step = 3;
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  resetPasswordSubmit(){
    this.isLoading = true;
    this._AuthonService.setResetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        this.isLoading = false;
        localStorage.setItem('token',res.token);
        this._Router.navigate(['/home'])
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
}
