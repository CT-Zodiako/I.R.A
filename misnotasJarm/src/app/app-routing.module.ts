import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriasComponent } from './materias/materias.component';
import { NotasComponent } from './notas/notas.component';
import { NotasEditarComponent } from './notas-editar/notas-editar.component';


const routes: Routes = [
  {path : 'notas', component : NotasComponent },
  {path : 'notas-editar', component : NotasEditarComponent },
  {path : 'materias', component : MateriasComponent },
  {path : '', redirectTo: '/notas', pathMatch: 'full' },
  {path : 'notas-editar/:id', component : NotasEditarComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
