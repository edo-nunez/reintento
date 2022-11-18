import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { Acceso } from '../../../modelos/acceso';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit, OnDestroy {
  public datos: FormGroup;
  private login: Acceso;

  constructor(
    private router: Router,
    private servicioAuth: AuthService,
    private formulario: FormBuilder,
    private http: HttpClient,

  ) {
    this.datos = this.formulario.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
    });
  }

  ngOnInit() {}

  public campo(verif: string) {
    return this.datos.get(verif);
  }

  public seToca(verif: string) {
    return this.datos.get(verif).touched;
  }

  public seLlena(verif: string) {
    return this.datos.get(verif).dirty;
  }

  iniciarSesion() {
    const hola = this.datos.value;
    this.login = {
      userName: hola.userName,
      password: hola.password
    }
    this.servicioAuth.iniciar(this.login);
    this.router.navigateByUrl('/inicio');
  }

  ngOnDestroy(): void {
    if (this.servicioAuth.sub$) {
      this.servicioAuth.sub$.unsubscribe();
    }
  }


}
