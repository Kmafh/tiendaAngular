import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  menuItems:any[];
  imgUrl:string;
  userLogin : Usuario;
    
    
  constructor(private sidebarService: SidebarService, private userService: UsuarioService){
    this.menuItems = sidebarService.menu;
    this.userLogin = userService.userLogin,
    this.imgUrl = this.userLogin.getImg
  }

}
