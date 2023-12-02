import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/enviroments/environment.prod';
const endpoint: any = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  token!:string;
  constructor(
    private http: HttpClient,
  ) {
    sessionStorage.getItem("token") ? this.token = sessionStorage.getItem("token")! : null;
   }

  getProductos() {
    return this.http.get(`${endpoint}/products`)
  }
  getProductosByID(){}
  getProductosByUID(){}
  setProducto(formData: any) {
    //pendiente de *RegisterForm
    return this.http.post(`${endpoint}/products`, formData);
    // return this.http.post(`${endpoint}/login/sendMail`, formData);
  }
  putProducto(tipe:string, data: { name: string, img:string }) {
    let userUpdate = data as Usuario;
    
    return this.http.put(`${endpoint}/products/` + userUpdate.uid, userUpdate, {
      headers: {
        'x-token': this.token,
      },
    });
  }
  deleteProducto(){}
  desactiveProducto(){}

}
