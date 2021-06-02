import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ruta de los componentes
import { TableComponent } from './pages/table/table.component';
import { FormComponent } from './pages/form/form.component';

const routes: Routes = [
  { path: 'tableColor', component: TableComponent },

  // componente reutilizable 
  { path: 'formColor', component: FormComponent },
  { path: 'editColor/:id', component: FormComponent },

  // componente de redireccion
  { path: '**', pathMatch: 'full', redirectTo: 'tableColor' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ComponentsRoutingModule {}
