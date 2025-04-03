import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { cartData } from '../../../product';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  _ProductService = inject(ProductService);
   _ToastrService = inject(ToastrService);
  cartData : any ;
  products : cartData[]=[]; 
  isLoading : boolean = false;

  ngOnInit(): void {
    this.isLoading=true;
    this._ProductService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res);
        this.isLoading=false;
        this.cartData = res;
        this.products=res.data.products;
      },
      error:(err)=>{
        console.log(err);
      },
    })
  }

  updateQuantity(count:any , id:any){
    this._ProductService.updateItemQuantity(count,id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData = res;
        this.products=res.data.products;
        this._ToastrService.success('Product count updated!')
      },
      error:(err)=>{
        console.log(err);
        this._ToastrService.error('Something Error')
      }
    })
  }

  removeCartItem(id:any){
    this._ProductService.removeItem(id).subscribe({
      next:(res)=>{
          this.cartData = res;
          this.products=res.data.products;
          this._ProductService.numOfCartItems.set(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  clearAllCart(){
    this._ProductService.clearCart().subscribe({
      next:(res)=>{
        if(res.message === 'success'){
          this.cartData = null;
          this.products = [];
          this._ProductService.numOfCartItems.set(0)
          this._ToastrService.success('All products removed successfully')
        }
      },
      error: (err) => {
        this._ToastrService.error('Failed to clear your cart. Please try again.');
        console.error(err);
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

}
