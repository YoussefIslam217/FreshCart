import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { wishListData } from '../../../product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

    _ProductService = inject(ProductService);
    _ToastrService = inject(ToastrService);
    wishListData : any ;
    wishLists : wishListData[]=[]; 
    isLoading : boolean = false;
  
    ngOnInit(): void {
      this.isLoading=true;
      this._ProductService.getLoggedUserWishList().subscribe({
        next:(res)=>{
          console.log(res);
          this.isLoading=false;
          this.wishListData = res;
          this.wishLists=res.data;
        },
        error:(err)=>{
          console.log(err);
        },
      })
    }

    removeWishListItem(id: any) {
      this._ProductService.removeItemFromWishList(id).subscribe({
        next: (res) => {
          this.wishLists = this.wishLists.filter(item => item._id !== id);
          this.wishListData.count -= 1;
          this._ToastrService.success('Item removed from wishlist successfully!');
        },
        error: (err) => {
          console.log(err);
          if (err.status === 401) {
            this._ToastrService.error('Your session has expired. Please log in again.');
          } else {
            this._ToastrService.error('Failed to remove item from wishlist.');
          }
        },
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

}
