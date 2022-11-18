import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RespuestaProductos, ProductoConID } from '../modelos/producto';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private URL_PRODUCTO = 'https://dummyjson.com/auth/products?skip=0';
  private paginaActual = 1;
  private skip = 5;
  private listaProductos = new BehaviorSubject<Array<ProductoConID>>([]);

  public lista$ = this.listaProductos.asObservable();
  public resultado!: ProductoConID;
  public guardarProductos: Array<ProductoConID> = [];

  private token = sessionStorage.getItem('token');
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers = this.headers.append('Authorization', 'Bearer ' + this.token);
  }

  public obtenerProductoPorId (id:number): Observable<ProductoConID> {
    return this.http.get<ProductoConID>(`${this.URL_PRODUCTO}/${id}`, {headers: this.headers});
  }

  public primerosProductos() {
    this.http
      .get<RespuestaProductos>(`${this.URL_PRODUCTO}?limit=5`, {
        headers: this.headers,
      })
      .subscribe((data) => {
        this.listaProductos.next(data.products);
        this.skip = this.skip + data.skip;
        console.log(data); //Solo para confirmar en la consola que no hay errores de productos
      });
  }

  public otrosProductos() {
    this.http
      .get<RespuestaProductos>(`${this.URL_PRODUCTO}?skip=${this.skip}`, {
        headers: this.headers,
      }).pipe
      (
        delay(1500)
      ).subscribe(data =>{
        if(data){
          this.skip = this.skip + data.skip;
          console.log(data);
          this.listaProductos.next(this.listaProductos.getValue().concat(data.products));
        }
      });
  }

}

