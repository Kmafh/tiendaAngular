import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

declare const google:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{
  formSubmited = false;


  form = this.fb.group({
    
    email:[localStorage.getItem('email') || '',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    remember:[false,[Validators.required]],
  })

  constructor(private fb: FormBuilder, private userService: UsuarioService, private router: Router) {

  }
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "707524561386-47strpsnldt5agagki784ln2g776pi9v.apps.googleusercontent.com",
      callback: (response:any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response:any){
    this.userService.loginGoogle(response.credential).subscribe((resp) =>{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
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
        title: `Bienvenido ${this.form.value.email}.`
      }),
      this.router.navigate(['/dashboard'])

    },(err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.msg,
      })
    
    })
  }






  login() {
    this.userService.login(this.form.value)
    .subscribe( resp => {

      const remember = this.form.get('remember')!.value;
      const email = this.form.get('email')!.value
      if(remember){
        localStorage.setItem('email', email?.toString()!)
      } else {
        localStorage.removeItem('email')

      }



      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
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
        title: `Bienvenido ${this.form.value.email}.`
      }),
      this.router.navigate(['/dashboard'])

    },(err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.msg,
      })
    })
  }
}
