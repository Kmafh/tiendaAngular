import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/enviroments/environment.prod';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

declare const google: any;
declare const gapi: any;

const endpoint: any = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private userSubject: Subject<Usuario> = new Subject<Usuario>();
  public auth2: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    //this.googleInit();
    sessionStorage.getItem("us") ? this.user = JSON.parse(sessionStorage.getItem("us")!) : null;
  }
  get token(): string {
    return sessionStorage.getItem('token') || '';
  }
  private _user: any; // Ajusta el tipo de '_user' según tu implementación
  private _userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  get user(): any {
    return this._user;
  }

  set user(newUser: any) {
    this._user = newUser;
    this._userSubject.next(newUser);
  }

  get userChange(): Observable<any> {
    return this._userSubject.asObservable();
  }
  setUser(newUser: Usuario) {
    this.user = newUser;
    this.userSubject.next(newUser); // Emitir el nuevo usuario a los observadores
  }

  getUserObservable() {
    return this.userSubject.asObservable();
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
    sessionStorage.removeItem('us');
    this._user = null;
    this.user = null;
    // google.accounts.id.revoke('artadapt@gmail.com', () => {
    //   this.router.navigateByUrl('/login');
    // });
  }

  login(formData: any) {
    return this.http.post(`${endpoint}/login`, formData).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
        sessionStorage.setItem('us', JSON.stringify(resp.usuario));
      })
    );
  }

  createUser(formData: any) {
    //pendiente de *RegisterForm
    return this.http.post(`${endpoint}/usuarios`, formData);
    // return this.http.post(`${endpoint}/login/sendMail`, formData);
  }

  updateUser(tipe:string, data: { name: string, img:string }) {
    let userUpdate = data as Usuario;
    if(tipe==='del'){
      userUpdate.active = false;
    } else if (tipe==='name') {
      userUpdate.name = data.name;

    } else if (tipe==='img') {
      userUpdate.img = data.img;

    }
    return this.http.put(`${endpoint}/usuarios/` + userUpdate.uid, userUpdate, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  updateRole(userUpdate:Usuario) {
    return this.http.put(`${endpoint}/usuarios/` + userUpdate.uid, userUpdate, {
      headers: {
        'x-token': this.token,
      },
    });
  }
  loginGoogle(token: string) {
    return this.http.post(`${endpoint}/login/google`, { token }).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
      })
    );
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get(`${endpoint}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, name, role, uid, google, img, fondo  } = resp.usuario;
          this.user = new Usuario(name, email, img, uid, role, google,fondo);
          sessionStorage.setItem('token', resp.token);
          return true;
        }),
        map((resp) => true),
        catchError((error) => of(false))
      );
  }

  getUsuarios( desde:number = 0) {
    return this.http.get(`${endpoint}/usuarios?desde=${ desde }`, {
      headers: {
        'x-token': this.token,
      }
    })
    .pipe(
      delay(500),
      map( (resp:any) => {
         let usuarios = resp.usuarios as Usuario[];
         usuarios = usuarios.map(user => new Usuario(user.name, user.email,user.img, user.uid, user.role, user.google,))
        return {
          usuarios,
          total: resp.total
        };
      })
    )
  }

  getUsuarioByUID(uid:any) {
    return this.http.get(`${endpoint}/usuarios/us/${uid}`, {
      headers: {
        'x-token': this.token,
      }
    })
    .pipe(
      delay(500),
      map( (resp:any) => {
         let user = resp.user[0] as Usuario;
        return {
          user
        };
      })
    )
  }

}
