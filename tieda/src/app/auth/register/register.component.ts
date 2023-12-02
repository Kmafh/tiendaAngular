import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formSubmited = false;


  form = this.fb.group({
    nombre:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    password2:['',[Validators.required]],
    check:['',[Validators.required]],
  })
  constructor(private fb: FormBuilder, private userService: UsuarioService, private router: Router){

  }

  createUser(){
    if(this.form.invalid || this.passNotValid()){
    return;
    } else {
      this.userService.createUser(this.form.value).subscribe((resp) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: `Bienvenido ${this.form.value.nombre}. Ya puede loguearse`
        }),
        this.router.navigate([''])

      },(err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...Error en el registro',
          text: err.error.msg,
        }),
        this.router.navigate(['/register'])
      })
    }
    this.formSubmited =true;
  }

  notValidCamp(  camp:string ):boolean{

    if ( this.form.get(camp)!.invalid && this.formSubmited){
      return true;
    } else {
      if ( camp == 'check' && this.form.value.check?.toString()=="false"){
        return true;
      }       
      return false;
    }
    
  }
  passNotValid() {
    if (this.form.value.password && this.form.value.password !== this.form.value.password2 && this.formSubmited){
      return true;
    } 
    return false;
  }
}
