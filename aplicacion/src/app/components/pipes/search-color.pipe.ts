import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchColor'
})

export class SearchColorPipe implements PipeTransform {
  transform(colors: any, searchColor: string): any {
    /*
      codigo que retorna la tabla si el valor a
      buscar es diferente al valor ingresado en el
      campo de busqueda
    */
    if(!colors || !searchColor) return colors;

    /*
      codigo que retorna la tabla si el campo esta vacio 
      o si el campo tiene menos de 3 caracteres
    */
    if(searchColor === '' || searchColor.length <3) return colors;

    /*
      codigo para filtrar un dato por nombre el cual
      con el uso de toLowerCase nos permite hacerlos
      por mayusculas o minusculas
    */
    return colors.filter(result =>
      result.color.toLowerCase().indexOf(searchColor.toLowerCase()) !== -1
    );
  };
}
