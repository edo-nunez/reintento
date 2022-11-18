import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, InfiniteScrollCustomEvent } from '@ionic/angular';
import { ProductoConID } from '../../modelos/producto';
import { ProductoService } from '../../servicios/producto.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll;
  public arregloProductos: Array<ProductoConID>;

  constructor(
    private servicioProducto: ProductoService,
    private router: Router
  ) {
    this.servicioProducto.primerosProductos();
    this.servicioProducto.lista$.subscribe((data) => {
      this.arregloProductos = data;
    });

    if (this.scroll) {
      console.log(this.scroll);
      this.scroll.complete();
      console.log(this.scroll.complete());
    }
  }

  ngOnInit() {}

  accederElemento(producto: ProductoConID) {
    this.router.navigate(['/detalle-producto/' + producto.id]);
  }

  onIonInfinite(ev : any) {
    this.servicioProducto.otrosProductos();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1500);
  }

}
