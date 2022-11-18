import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioSesionPageRoutingModule } from './inicio-sesion-routing.module';

import { InicioSesionPage } from './inicio-sesion.page';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../servicios/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioSesionPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [InicioSesionPage],
  providers: [Storage, AuthService]
})
export class InicioSesionPageModule {}
