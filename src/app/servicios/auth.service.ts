import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Acceso } from '../modelos/acceso';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URL_API = 'https://dummyjson.com/auth/login';
  private URL_REGISTRO = 'https://dummyjson.com/users/add';
  public iniciarSesion!: Acceso;
  public sub$: Subscription;
  private contador?: number;
  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router) {}

  registrar(usuario: Usuario) {
    this.http
      .post<any>(this.URL_REGISTRO, {
        headers: { 'Content-Type': 'application/json' },
        body: {
          ...usuario
        },
      })
      .subscribe(
        (respuestaUsuario) => {
          console.log(respuestaUsuario.id),
          console.log(JSON.stringify(usuario));
          this.usuario = {
            ...respuestaUsuario
          }

        },
        (error) => {
          console.log('Error. No se pudo registrar el usuario', error);
        }
      );
      this.contador++;
  }

  iniciar(usuario: Acceso) {
    this.http
      .post<any>(this.URL_API, {...usuario}, {
        headers: {'Content-Type': 'application/json'},
      })
      .subscribe(
        (respuesta) => {
          const token = respuesta.token;
          const inicioUsuario: Usuario = {
            ...respuesta
          };

          this.usuario = inicioUsuario;
          sessionStorage.setItem('token', token);
          sessionStorage.setItem(
            'inicioUsuario',
            JSON.stringify(inicioUsuario)
          );
          console.log(respuesta);
        },
        (error) => {
          console.log('Error. Inicio de sesión fallido', error);
        }
      );
  }
}
