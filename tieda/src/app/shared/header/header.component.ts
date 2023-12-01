import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
public imgUrl = '';
 userLogin : Usuario
  constructor(private userService: UsuarioService, private router: Router){
    
    this.userLogin = userService.userLogin,
    console.log("User: "+this.userLogin.nombre)
    this.imgUrl = this.userLogin.getImg
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('')
  }
  
}
