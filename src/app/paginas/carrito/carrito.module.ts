import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritoPageRoutingModule } from './carrito-routing.module';

import { CarritoPage } from './carrito.page';
import { HttpClientModule } from '@angular/common/http';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarritoPageRoutingModule,
    HttpClientModule
  ],
  declarations: [CarritoPage],
  providers: [CarritoService, ProductoService, AuthService]
})
export class CarritoPageModule {}
