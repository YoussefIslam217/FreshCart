import { Routes } from '@angular/router';
import { HomeComponent } from './features/components/home/home.component';
import { CartComponent } from './features/components/cart/cart.component';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { BrandsComponent } from './features/components/brands/brands.component';
import { ProductsComponent } from './features/components/products/products.component';
import { LoginComponent } from './features/components/login/login.component';
import { RegisterComponent } from './features/components/register/register.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { SingleProductComponent } from './features/components/single-product/single-product.component';
import { WishlistComponent } from './features/components/wishlist/wishlist.component';
export const routes: Routes = [
    {path:'',redirectTo:"/login",pathMatch:'full'},
    {path:"home",component:HomeComponent,title:"home",canActivate:[authGuard]},
    {path:"cart",component:CartComponent,title:"cart",canActivate:[authGuard]},
    {path:"checkout/:cartId",loadComponent:()=>{return import('./features/components/checkout/checkout.component').then((c)=>{return c.CheckoutComponent})},title:"checkout",canActivate:[authGuard]},
    {path:"categories",component:CategoriesComponent,title:"categories",canActivate:[authGuard]},
    {path:"brands",component:BrandsComponent,title:"brands",canActivate:[authGuard]},
    {path:"products",component:ProductsComponent,title:"products",canActivate:[authGuard]},
    {path:"wishlist",component:WishlistComponent,title:"wishlist",canActivate:[authGuard]},
    {path:"single/:pid/:pName/:pCat",component:SingleProductComponent,title:"single-product",canActivate:[authGuard]},
    {path:"login",component:LoginComponent,title:"login", },
    {path:"register",component:RegisterComponent,title:"register", },
    {path:"forget",loadComponent:()=>{return import('./features/components/forget-password/forget-password.component').then((c)=>{return c.ForgetPasswordComponent})},title:"forgetPassword",canActivate:[authGuard] },
    {path:"**",loadComponent:()=>{return import('./features/components/notfound/notfound.component').then((c)=>{return c.NotfoundComponent})},title:"404 error", canActivate:[authGuard]}
];
