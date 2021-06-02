import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// routing personalizado para los componentes
import { ComponentsRoutingModule } from './components-routing.module';

// modulos de firestore
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire"
import { environment } from "../../environments/environment";

// pipe personalizado para busqueda de datos
import { SearchColorPipe } from './pipes/search-color.pipe';

// modulos para el manejo de formularios
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// componentes de la aplicacion
import { NavbarComponent } from './templates/navbar/navbar.component';

import { TableComponent } from './pages/table/table.component';
import { FormComponent } from './pages/form/form.component';

@NgModule({
  declarations: [
    SearchColorPipe,
    
    NavbarComponent,
    TableComponent, 
    FormComponent
  ],

  imports: [
    CommonModule,
    ComponentsRoutingModule,

    FormsModule, ReactiveFormsModule,

    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],

  exports: [
    SearchColorPipe,

    NavbarComponent,
    TableComponent, 
    FormComponent 
  ],
})

export class ComponentsModule {}
