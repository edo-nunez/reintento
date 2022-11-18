import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Carro } from '../../modelos/carro';
import { CarritoService } from '../../servicios/carrito.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/modelos/usuario';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  public URL_USUARIO_CARRITO = 'https://dummyjson.com/auth/users/';

  private elToken: sessionStorage.getItem('token');
  private headers: new HttpHeaders();
  public carrito: Carro;
  public inicioUsuario: Usuario;

  constructor(
    private servidorCarrito: CarritoService,
    private servicioAuth: AuthService,
    private http: HttpClient
  ) {
    const elToken = sessionStorage.getItem('token');
    const usuario = JSON.parse(sessionStorage.inicioUsuario);
    this.headers = this.headers.append('Authorization', 'Bearer ' + this.elToken);
    this.inicioUsuario = usuario;
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  cargarCarrito(id: string){
    this.http.get<Carro>(`${this.URL_USUARIO_CARRITO}/${id}/carts`, { headers: this.headers }).
    subscribe(data =>{
      ...this.carrito;
    })
  }

  ionWillEnter(){
    this.cargarCarrito(this.inicioUsuario)
  }

  ngOnInit() {
  }

}
