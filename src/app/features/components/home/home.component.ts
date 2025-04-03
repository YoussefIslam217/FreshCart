import { AuthonService } from './../../../core/services/authon/authon.service';
import { Category, Product } from '../../../product';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SliderCategoriesComponent } from "../../../shared/category/slider-categories/slider-categories.component";
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsComponent } from "../products/products.component";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  imports: [FormsModule, SliderCategoriesComponent, CarouselModule, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy {
  _ProductService = inject(ProductService);
  _AuthonService = inject(AuthonService);
  _ToastrService = inject(ToastrService);

   customMainSlider: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: true,
      dots: false,
      navSpeed: 300,
      autoplay: true,
      navText: ['', ''],
      items:1 ,
      nav: false,

    }


  searchValue : string = '';
  isLoading : boolean = false;
  allProducts : Product[] = [];
  allCategories : Category[] = [];
  productSubscription = new Subscription();
  categorySubscription = new Subscription();

  ngOnInit(): void {
    this.isLoading = true;
    this.productSubscription = this._ProductService.getAllProducts().subscribe({
      next:(res)=>{
        this.allProducts=res.data;
        this.isLoading = false;
      },
      error:(err)=>{
        console.log(err);
        this._ToastrService.error(err.message);
      }
    });

    this.categorySubscription = this._ProductService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res);
        this.allCategories=res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    });

    this._ProductService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this._ProductService.numOfCartItems.set(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
      }
      
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

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.categorySubscription.unsubscribe();
  }
}
