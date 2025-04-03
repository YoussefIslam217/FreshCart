import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../core/services/product/product.service';
import { Categ } from '../../../shared/interfaces/categ';


@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

      _ProductService = inject(ProductService);
      _ToastrService = inject(ToastrService);
    
      isLoading : boolean = false;
      allCategories : Categ[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this._ProductService.getAllCategories().subscribe({

      next:(res)=>{
        this.allCategories=res.data;
        this.isLoading = false;
      },
      error:(err)=>{
        console.log(err);
        this._ToastrService.error(err.message);
      }
    });
  }
}
