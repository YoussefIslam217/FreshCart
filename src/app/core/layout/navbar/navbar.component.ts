import { MytranslationService } from './../../services/mytranslation.service';
import { ProductService } from './../../services/product/product.service';
import { AuthonService } from './../../services/authon/authon.service';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  _AuthonService = inject(AuthonService);
  _Router = inject(Router); 
  _translate = inject(MytranslationService);
  _ProductService = inject(ProductService);
  loggedUserName : string = '';

  numOfCart = computed(()=>{
    return this._ProductService.numOfCartItems();
  });

  enableNavbar :boolean = false;

  ngOnInit():void {
    this._AuthonService.isLogin.subscribe((val)=>{ 
      this.enableNavbar=val;
      console.log('navbar subscribe', val);
      this._AuthonService.userName.subscribe((value)=>{
        this.loggedUserName = value;
      })
    });


    
  }
  logOut(){
    localStorage.removeItem('token');
    this._AuthonService.isLogin.next(false);
    this._Router.navigate(['/login']);
  }



}
