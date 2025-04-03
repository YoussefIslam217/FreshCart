import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../product';
import { SearchPipe } from "../../../core/pipes/search.pipe";
import { RouterLink } from '@angular/router';
import { OnsalePipe } from '../../../core/pipes/onsale.pipe';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [FormsModule ,SearchPipe , RouterLink , OnsalePipe , CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

    _ProductService = inject(ProductService);
    _ToastrService = inject(ToastrService);


    isLoading : boolean = false;
    allProducts : Product[] = [];
    searchValue : string = '';
    isRed = false;
   
  
    ngOnInit(): void {
      this.isLoading = true;
      this._ProductService.getAllProducts().subscribe({
  
        next:(res)=>{
          this.allProducts=res.data;
          this.isLoading = false;
        },
        error:(err)=>{
          console.log(err);
          this._ToastrService.error(err.message);
        }
      });
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

changeToRed() {
  this.isRed = !this.isRed;
}

}
