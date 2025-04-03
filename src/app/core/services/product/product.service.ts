import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) {}
  
  numOfCartItems = signal(0);

  getAllProducts():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  getAllCategories():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  getSpecificProduct(x:any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${x}`)
  }
  
  addProductToCart(mytoken:any, pId:any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
        {productId : pId} ,
        {
         headers : {
            token : mytoken,
         }
        }
    )
  }

  addProductToWishList(mytoken:any, pId:any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist',
        {productId : pId} ,
        {
         headers : {
            token : mytoken,
         }
        }
    )
  }


  getLoggedUserCart():Observable<any>{

    let mytoken:any = localStorage.getItem('token');
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers: {
        token: mytoken ,
      },
    }

    )
  }

  getLoggedUserWishList():Observable<any>{

    let mytoken:any = localStorage.getItem('token');
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
      headers: {
        token: mytoken ,
      },
    })
  }

  updateItemQuantity(myCount:any , id:any):Observable<any>{
   let mytoken:any = localStorage.getItem('token');
   return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {count:myCount}, {
    headers:{
      token: mytoken,
    },
   })
  }

  removeItem(id:any):Observable<any>{
    let mytoken:any = localStorage.getItem('token');
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{
     headers:{
       token: mytoken
     }
    })
   }

   removeItemFromWishList(id:any):Observable<any>{
    let mytoken:any = localStorage.getItem('token');
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` ,{
     headers:{
       token: mytoken
     }
    })
   }

   checkOutSession(cartId:any , addressData:any):Observable<any>{
    let myToken :any = localStorage.getItem('token');
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {
      shippingAddress:addressData
    },
    {
        headers:{
          token: myToken
        }
    }
  );
   }

   clearCart():Observable<any>{
    let mytoken:any = localStorage.getItem('token');
    return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart' ,{
     headers:{
       token: mytoken
     }
    })
   }



   getAllBrands():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
  }



}
