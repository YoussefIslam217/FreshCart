import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { Category } from '../../../product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider-categories',
  imports: [CarouselModule],
  templateUrl: './slider-categories.component.html',
  styleUrl: './slider-categories.component.scss'
})
export class SliderCategoriesComponent implements OnInit {
  _ProductService=inject(ProductService);

  @Input() categories!:Category[];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    autoplay:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }


  ngOnInit(): void {

    console.log(this.categories);
  }
}
