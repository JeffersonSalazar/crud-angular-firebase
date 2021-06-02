import { Component, OnInit } from '@angular/core';

/* 
  1- modelo de datos 
  2- servicio
  3- router y activeroute
  4- sweet alert 2
*/
import { ColorModel } from '../../models/color';
import { ColorService } from "../../services/color.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  // varibale para almacenar los datos ingresados en los inputs
  formColor: ColorModel = {
    color: '',
    tono: ''
  }
  
  // variables para hacer el cambio de texto del titulo y el boton
  title: string = 'Nuevo Color';
  btnTitle: string = 'Guardar';

  // variables para mostrar u ocultar el espinner y la validacion
  spinnerLoading: boolean;
  fieldsRequire: boolean;

  /*
    esta variable la definimos para posteriormente almacenarle
    un tipo de dato y ese dato lo utilizaremos para ejecutar 
    un metodo acorde a la accion a realizar (guardar o actualizar)
  */
  colorId: null | string;

  constructor(
    public _colorServ: ColorService, // 2-
    public _router: Router, public _activate: ActivatedRoute // 3-
  ) 
  {
    /* 
      despues de inyectar activatedRoute este nos permite usar
      sus propiedades las cuales vemos en la linea 54, estos
      nos permiten almacenar en la variable un null si no le pasamos
      un id y un string si le pasamos un id
    */
    this.colorId = this._activate.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.edit(); //=> metodo ejecutado por el ngOnInit
  }

  /*
    aqui definimos el metodo del boton del formulario
    en la linea 71 tenemos un condicional donde preguntamos
    que si los campos del formulario estan vacios nos muestre 
    la validacion y retorne el formulario.
    en la linea 76 definimos otro condicional que ejecuta
    la accion en el formulario segun el tipo de dato 
    que tenga la variable colorId en ese momento
  */
  saveUpdate() {
    if(this.formColor.color === '' || this.formColor.tono === ''){
      this.fieldsRequire = true;
      return this.formColor;
    }

    if(this.colorId === null) { // si el condicional se cumple se ejecuta el metodo save
      this.save();
    } else { // si el condicional no se cumple se ejecuta el metodo update
      this.update();
    };
  };

  /*
    aqui definimos un metodo para agregar, en la linea 93 
    mostramos el spinner de proceso, en la linea 95 utilizamos
    el metodo addColor() definido en el servicio 
    al cual le pasamos como parametro los valores del formColor,
    si la accion es correcta este nos redirige al TableComponent
    oculta el spinner y por ultimo atraves de SweetAlert
    nos muestra por pantalla una notificacion del registro del nuevo usuario
  */
  save() {
    this.spinnerLoading = true; // muestra el spinner

    this._colorServ.addColor(this.formColor).then( ()=> {
      this._router.navigate(['/tableColor']); // redireccionamiento a tableColor
      
      this.spinnerLoading = false; // oculta el spinner

      // alertas de sweet alert
      Swal.fire({
        html: '<h6 class="alert_text">Elemento creado correctamente</h6>',
        icon: 'success',
        iconColor: '#fff',
        padding: '20px',
        background: 'rgb(0, 132, 255)',
        position: 'bottom-end',
        showConfirmButton: false,
        toast: true,
        timer: 2500
      });
    }).catch(err => console.log(err));
  };

  /*
    aqui definimos un metodo para actualizar, en la linea 126 
    mostramos el spinner de proceso, en la linea 128 utilizamos
    el metodo updateColor() definido en el servicio en el cual
    le pasamos como parametro el id alamacenado en colorId y 
    los valores del formColor si la accion es correcta este nos 
    redirige al TableComponent oculta el spinner y por ultimo 
    atraves de SweetAlert nos muestra por pantalla una notificacion 
    de la actualizacion del usuario
  */
  update() {
    this.spinnerLoading = true; // muestra el spinner

    this._colorServ.updateColor(this.colorId, this.formColor).then( ()=> {
      this._router.navigate(['/tableColor']); // redireccionamiento a tableColor

      this.spinnerLoading = false; // oculta el spinner

      // alertas de sweet alert
      Swal.fire({
        html: '<h6 class="alert_text">Elemento actualizado correctamente</h6>',
        icon: 'success',
        iconColor: '#fff',
        padding: '20px',
        background: '#0DCAF0',
        position: 'bottom-end',
        showConfirmButton: false,
        toast: true,
        timer: 2500
      });
    }).catch(err => console.log(err));
  };

  /*
    aqui definimos un metodo editar que es ejecutado por el
    ngOnInit este metodo atravez de un condicional nos dice
    que si el colorId es diferente a null cambie el valor
    de las variables title y btntitle posterior a esto
    en la linea 164 le decimos que ejecute el metodo editColor 
    definido en el servicio donde le pasamos el valor almacenado 
    en colorId por ultimo le decimos al formulario que almacene 
    la respuesta de la base de datos
  */
  edit() {
    if(this.colorId !== null) {
      this.title = 'Actualizar Color'; // cambio de titulo
      this.btnTitle = 'Actualizar'; // cambio de texto del boton

      this._colorServ.editColor(this.colorId).subscribe(
        res => this.formColor = res,
        err => console.log(err)
      );
    };
  };
}
