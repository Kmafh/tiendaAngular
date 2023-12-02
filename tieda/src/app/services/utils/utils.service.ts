import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { UsuarioService } from '../usuarios/usuarios.service';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor( private userService: UsuarioService, private router: Router,
  private productService: ProductsService) { }


// Metodos Auth

//Metodo para leer el usuario logueado.

getUserLogin() {
  return this.userService.user;
}

  // Metodos USUARIOS
  async setUsuario(user: any) {
    user.active = true;
    user.img = 'perfil.png';
    user.fondo = 'user-info.jpg';
    this.userService.createUser(user).subscribe(
      (respF: any) => {
        console.table(respF);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // Metodos PRODUCTOS
  async setProduct(user: any) {
    user.active = true;
    user.img = 'perfil.png';
    user.fondo = 'user-info.jpg';
    this.userService.createUser(user).subscribe(
      (respF: any) => {
        console.table(respF);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  async getProducts() {
    const alert: Product[] = await new Promise<any>((resolve, reject) => {
      let filter: any[] = [];
      this.productService.getProductos().subscribe(
        (resp: any) => {
          const alerts = resp.products as Product[];
          // Ordenar movs por la propiedad createAt en orden ascendente
          resolve(alerts);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return alert;
  }
}
