import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ColumnComponent} from "./column/column.component";
import {PieComponent} from "./pie/pie.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pie' },
  {
    path: 'pie',
    title: 'Pie',
    component: PieComponent
  },
  {
    path: 'column',
    title: 'Column',
    component: ColumnComponent
  },
  {
    path: '**',
    redirectTo: 'pie'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
