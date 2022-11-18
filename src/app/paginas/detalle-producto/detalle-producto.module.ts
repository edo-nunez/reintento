import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetalleProductoPage} from './detalle-producto.page';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from 'src/app/servicios/producto.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { CarritoService } from '../../servicios/carrito.service';
import { DetalleProductoPageRoutingModule } from './detalle-producto-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleProductoPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [DetalleProductoPage],
  providers: [ProductoService, AuthService, CarritoService]
})
export class DetailPageModule { }
