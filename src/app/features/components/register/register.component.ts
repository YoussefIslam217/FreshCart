import { AuthonService } from './../../../core/services/authon/authon.service';
import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  isErrorMsg : boolean = false;
  isLoading  : boolean = false;

  _AuthonService= inject(AuthonService);


  registerForm = new FormGroup({
    name:new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(14)]),
    email:new FormControl(null , [Validators.required , Validators.email]),
    password:new FormControl(null , [Validators.required , Validators.pattern(/^.{6,15}$/)]),
    rePassword:new FormControl(null , [Validators.required , Validators.pattern(/^.{6,15}$/)]),
    phone:new FormControl(null , [Validators.required ,  Validators.pattern(/^01[01245][0-9]{8}$/)]),
  },this.confirmPassward);


  confirmPassward (f:any) {
    if(f.get('passward')?.value === f.get('rePassward')?.value){
      return null
    }else{
      return {didntMatch:true}
    }
  }

  getData(form:any) {
    this.isLoading = true;
    if(form.valid){
      this._AuthonService.signUp(form.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isErrorMsg = false;
          this.isLoading = false;
        },
        error:(err)=>{
          console.log(err);
          this.isErrorMsg = true;
          this.isLoading = false;
        }, 
      });
    } else {
      console.log('el form invalid')
    }
   
  }




}
