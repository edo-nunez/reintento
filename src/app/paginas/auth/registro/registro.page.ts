import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PickerController } from '@ionic/angular';
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formulario: FormGroup;

  constructor(
    private servicioAuth: AuthService,
    private form: FormBuilder,
    private control: PickerController

  ) { }

  ngOnInit() {
    this.formulario = this.form.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      birthDate: ['2004-11-17', [Validators.required]],
      gender: ['Género', [Validators.required]]
    })
  }

  registrarse(){
    console.log(this.formulario.getRawValue())
    this.servicioAuth.registrar(this.formulario.getRawValue());
  }

  async openPicker() {

  }

}
