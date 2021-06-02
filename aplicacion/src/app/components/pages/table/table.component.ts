import { Component, OnInit } from '@angular/core';

/* 
  1- modelo de datos 
  2- servicio
  3- sweet alert 2
*/
import { ColorModel } from "../../models/color";
import { ColorService } from "../../services/color.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  /*
    variable que almacena la informacion alojada 
    en la base de datos, la cual utilizamos para
    mostrar por pantalla
  */
  colors: ColorModel[] = [];

  /* 
    variable para ngmodel y pipe con la cual realizamos
    el filtro de busqueda
  */
  searchColor: string;

  constructor(public _colorServ: ColorService) {}

  ngOnInit() {
    this.getColors(); //=> metodo que es ejecutado por ngOnInit
  };

  /*
    este metodo utiliza el servicio para asi
    acceder al metodo getColor que nos permite
    guardar en una variables la informacion que tiene
    la base de datos 
  */
  getColors() {
    this._colorServ.getColor().subscribe(
      res => this.colors = res, 
      err => console.log(err)
    );
  };

  /*
    aqui definimos el metodo para eliminar un dato, 
    antes de realizar dicha accion atraves de SweetAlert
    pedimos al usuario confirmacion 
  */
  delete(colorId: ColorModel) {
    Swal.fire({ //=> alertas de sweet alert
      text: "Estas seguro de eliminar este elemento?",
      icon: 'question',
      iconColor: 'rgb(0, 132, 255)',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: 'rgb(0, 132, 255)',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'rgb(235, 88, 88)'
    })
    .then((result) => {
      if (result.isConfirmed) {
        this._colorServ.deleteColor(colorId).then( ()=> {
          Swal.fire({ //=> alertas de sweet alert
            html: '<h6 class="alert_text">Elemento eliminado correctamente</h6>',
            icon: 'success',
            iconColor: '#fff',
            showConfirmButton: false,
            padding: '20px',
            background: 'rgb(235, 88, 88)',
            toast: true,
            position: 'bottom-end',
            timer: 2500
          });
        }).catch( err => console.log (err) );
        /*
          esta linea de codigo nos permite traer nuevamente 
          la informacion permitiendonos ver los cambios 
          sin recargar la pantalla
        */
        this.getColors(); 
      };
    });    
  };
}
