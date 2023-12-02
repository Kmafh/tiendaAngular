import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
public imgUrl = '';
 userLogin : Usuario
  constructor(private userService: UsuarioService, private router: Router){
    
    this.userLogin = userService.user,
    this.imgUrl = this.userLogin?this.userLogin.getImgUrl:"";
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('')
  }
  
}
