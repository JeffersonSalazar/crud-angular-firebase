import { Injectable } from '@angular/core';

/* 
  a: modelo de datos / b: angular firestore
  c: observables / d: map
*/
import { ColorModel } from "../models/color";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ColorService {

  // variable declarada para almacenar valores de la DB
  private colors: Observable<any[]>;

  constructor(private _firestore: AngularFirestore) {
    // metodo para obtener el ID de un dato de la base de datos
    this.colors = this._firestore.collection('colors').snapshotChanges().pipe(map(res => {
      return res.map(data => {
        let colorId = data.payload.doc.data() as ColorModel;
        // console.log(colorId); //=> conoce todos los datos almacenados en la DB 

        colorId.id = data.payload.doc.id;
        // console.log(colorId.id); //=> conoce los ID de los datos almacenados en la DB

        return colorId;
      });
    }));
  }

  /*
    de la linea 40/42 encontramos el metodo para 
    obtener la informacion almacenada en la base de datos 
  */
  getColor(): Observable<any> {
    return this.colors;
  };
  
  /*
    de la linea 48/54 encontramos los metodos de eliminar y editar,
    de estos hace uso el componente TableComponent
  */
  deleteColor(colorId: ColorModel): Promise<any> {
    return this._firestore.collection('colors').doc(colorId.id).delete();
  };

  editColor(colorId: string): Observable<any> {
    return this._firestore.collection('colors').doc(colorId).valueChanges();
  };

  /*
    de la linea 60/66 encontramos los metodos de agregar
    y actualizar, de estos hace uso el componente FormComponent
  */
  addColor(newColor: ColorModel): Promise<any> {
    return this._firestore.collection('colors').add(newColor);
  };

  updateColor(colorId: string, newColor: ColorModel): Promise<any> {
    return this._firestore.collection('colors').doc(colorId).update(newColor);
  };
}
