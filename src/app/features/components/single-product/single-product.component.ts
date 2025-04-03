import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import {ActivatedRoute} from '@angular/router'
import { Product } from '../../../product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-product',
  imports: [],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent implements OnInit {

  _ProductService=inject(ProductService);
  
 _ActivatedRoute= inject(ActivatedRoute);
 _ToastrService = inject(ToastrService); 
 productDetails !: Product;
  

  currentImage: string = '';




  

  ngOnInit(): void {
    let productId = this._ActivatedRoute.snapshot.params?.['pid'];
    this._ProductService.getSpecificProduct(productId).subscribe({
      next:(res)=>{
        this.productDetails = res.data;
        this.currentImage =this.productDetails.imageCover;
      },
      error:(err)=>{
        this._ToastrService.error(err);
        
      },
    })

    
  }

  addToCart(id:any){

    let myToken = localStorage.getItem('token');
    this._ProductService.addProductToCart(myToken , id).subscribe({
      next:(res)=>{
        this._ToastrService.success('Product added successfully to cart');
        this._ProductService.numOfCartItems.set(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })

}

addToWishList(id:any){

  let myToken = localStorage.getItem('token');
  this._ProductService.addProductToWishList(myToken , id).subscribe({
    next:(res)=>{
      this._ToastrService.success('Product added successfully to your wishlist');
      
    },
    error:(err)=>{
      console.log(err);
    }
  })

}

changeImage(src: string) {
  this.currentImage = src; 
}


}
