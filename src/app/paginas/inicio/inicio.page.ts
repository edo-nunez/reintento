import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuario';
import { AuthService } from '../../servicios/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public usuario: Usuario;

  constructor(private servicioAuth: AuthService, private router: Router) {
    const token = sessionStorage.getItem('token');
    console.log(token);
    const usuario = JSON.parse(sessionStorage.InicioSesion);
    this.usuario = usuario;
    console.log(usuario); //Para confirmar que está el usuario
  }

  ngOnInit() {}

  ionViewWillEnter() {
    const token = sessionStorage.getItem('token');
    console.log(token);
    let headers: HttpHeaders = new HttpHeaders();

    headers = headers.append('Authorization', 'Bearer ' + token);
  }
}
