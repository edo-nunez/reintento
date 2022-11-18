import { Component, OnInit } from '@angular/core';
import { ProductoConID } from '../../modelos/producto';
import { agregarProducto, agregarCarro } from '../../modelos/carro';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarritoService } from '../../servicios/carrito.service';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../servicios/producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  public idActiva: 0;
  public productoActivo!: ProductoConID;
  public listaProducto: Array<agregarProducto> = [];
  public enviarCarro!: FormGroup;

  constructor(
    public servicioCarrito: CarritoService,
    private formulario: FormBuilder,
    private rutaActivada: ActivatedRoute,
    private servicioProducto: ProductoService
  ) {
    const usuario = JSON.parse(sessionStorage.inicioUsuario);
    this.enviarCarro = this.formulario.group({
      idUsuario: [usuario.id, [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1), Validators.max]],
    });
  }

  public nuevoProductoCarro: agregarCarro = {
    userId: '1',
    products: this.listaProducto,
  };

  ngOnInit() {}

  public campo(verif: string) {
    return this.enviarCarro.get(verif);
  }

  public seToca(verif: string) {
    return this.enviarCarro.get(verif).touched;
  }

  public seLlena(verif: string) {
    return this.enviarCarro.get(verif).dirty;
  }

  ionViewWillEnter() {
    this.rutaActivada.params.subscribe((parameters) => {
      this.idActiva = parameters.idProduct;
      this.servicioProducto
        .obtenerProductoPorId(this.idActiva)
        .subscribe((data) => {
          if (data) {
            this.productoActivo = data;
            console.log(data);
          }
        });
    });
  }

  agregarCarro() {
    const usuario = JSON.parse(sessionStorage.inicioUsuario);



    this.listaProducto.push({
      producto: this.productoActivo,
      quantity: this.enviarCarro.get('cantidad').value
    })

    const agregar = this.nuevoProductoCarro = {
      products: this.listaProducto,
      userId: usuario.id
    }

    console.log(agregar);
    this.servicioCarrito.agregarProducto(agregar);

}
