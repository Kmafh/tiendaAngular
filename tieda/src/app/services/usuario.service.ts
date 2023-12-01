import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/enviroments/environment.prod';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';

declare const google: any;
declare const gapi: any;

const endpoint: any = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public userLogin :Usuario ;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
   this.userLogin = new Usuario('','','','','',false,'');
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '707524561386-47strpsnldt5agagki784ln2g776pi9v.apps.googleusercontent.com',
        cookiepoliciy: 'single_host_origin',
      });
    });
  }
  
  logout() {
    sessionStorage.removeItem('token');

    google.accounts.id.revoke('artadapt@gmail.com', () => {
      this.router.navigateByUrl('/login');
    });
    // this.auth2.signOut().then( () => {
    //   this.router.navigateByUrl('/login');
    // })
    // this.router.navigateByUrl('/login');
  }

  login(formData: any) {
    return this.http.post(`${endpoint}/login`, formData).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
      })
    );
  }

  createUser(formData: any) {
    //pendiente de *RegisterForm

    return this.http.post(`${endpoint}/usuarios`, formData);
  }

  loginGoogle(token: string) {
    return this.http.post(`${endpoint}/login/google`, { token }).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
      })
    );
  }

  validateToken(): Observable<boolean> {
    const token = sessionStorage.getItem('token') || '';
    return this.http
      .get(`${endpoint}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { nombre, email,  img, google,  role, id} = resp.user
          this.userLogin = new Usuario(nombre, email, img, google,  role, id);
          sessionStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  
}
