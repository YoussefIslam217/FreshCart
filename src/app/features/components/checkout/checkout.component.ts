import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../../core/services/product/product.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  cartId !: string;
  _ProductService = inject(ProductService);
  _ActivatedRoute = inject(ActivatedRoute);
  _Router = inject(Router);

  addressForm = new FormGroup({
    phone: new FormControl(null , [Validators.required]),
    city: new FormControl(null , [Validators.required]),
    details: new FormControl(null , [Validators.required]),
  })

  onlinePayment(formData:any){
    let id = this._ActivatedRoute.snapshot.params?.['cartId']
    if(formData.valid){
      this._ProductService.checkOutSession(id,formData.value).subscribe({
        next:(res)=>{
          location.href = res.session.url; 
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }
}
