import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { Brands } from '../../../shared/interfaces/brands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  _ProductService = inject(ProductService);
  _ToastrService = inject(ToastrService);

  isLoading : boolean = false;
  allBrands : Brands[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this._ProductService.getAllBrands().subscribe({

      next:(res)=>{
        this.allBrands=res.data;
        this.isLoading = false;
      },
      error:(err)=>{
        console.log(err);
        this._ToastrService.error(err.message);
      }
    });
  }
}