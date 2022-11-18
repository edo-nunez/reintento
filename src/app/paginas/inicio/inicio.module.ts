import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProductoService } from '../../servicios/producto.service';
import { ListaComponent } from '../../componentes/lista/lista.component';

@NgModule({
    declarations: [InicioPage, ListaComponent],
    providers: [AuthService, ProductoService],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InicioPageRoutingModule,
    ]
})
export class InicioPageModule {}
