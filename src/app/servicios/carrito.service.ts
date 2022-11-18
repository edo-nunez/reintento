import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Acceso } from '../modelos/acceso';
import { agregarCarro, CarritoUsuario, Carro, agregarProducto } from '../modelos/carro';
import { ProductoConID } from '../modelos/producto';
import { Usuario } from '../modelos/usuario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  public usuario: Usuario;
  private token = sessionStorage.getItem('token');
  private headers = new HttpHeaders();

  public URL_CARRITO = 'https://dummyjson.com/auth/carts/add';
  public URL_USUARIO_CARRITO = 'https://dummyjson.com/auth/users/';

  public producto: ProductoConID;

  public agregarCarro: {
    id: number;
    quantity: 0;
  };

  public usuarioCarrito: CarritoUsuario = {
    id: 0,
    userId: 0,
    products: [],
    total: 0,
    discountedTotal: 0,
    totalProducts: 0,
    totalQuantity: 0,
  };

  constructor(public servicioAuth: AuthService, private http: HttpClient) {
    this.headers = this.headers.append('Authorization', 'Bearer ' + this.token);
    this.usuario = this.servicioAuth.usuario;
  }

  get carrito() {
    return this.usuarioCarrito;
  }

  cargarCarrito(id: string) {
    this.http
      .get<Carro>(`${this.URL_USUARIO_CARRITO}/${id}/carros`, {
        headers: this.headers,
      })
      .subscribe((data) => {
        console.log(data.carts);
        this.usuarioCarrito = data.carts[0];
      });
  }



  agregarProducto(nuevoCarro: agregarCarro) {
    this.http
      .post<CarritoUsuario>(`${this.URL_CARRITO}`, nuevoCarro, {
        headers: this.headers,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  agregarAlCarro(producto: ProductoConID) {
    const elemento = this.usuarioCarrito.products.find((consultarProducto) => {
      return consultarProducto.producto.id === producto.id;
    });
    if (elemento !== undefined) {
      elemento.quantity++;
    } else {
      const agregar: agregarProducto = {
        producto: producto,
        quantity: 1
      }
      this.usuarioCarrito.products.push(agregar);
      console.log(this.usuarioCarrito.products); //Para confirmar que se hayan agregado los productos
    }
  }
}
