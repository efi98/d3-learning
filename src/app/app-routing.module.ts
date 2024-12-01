import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ColumnComponent} from "./column/column.component";
import {ScatterComponent} from "./scatter/scatter.component";
import {LineComponent} from "./line/line.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'scatter' },
  {
    path: 'scatter',
    title: 'Scatter',
    component: ScatterComponent
  },
  {
    path: 'column',
    title: 'Column',
    component: ColumnComponent
  },
  {
    path: 'line',
    title: 'Line',
    component: LineComponent
  },
  {
    path: '**',
    redirectTo: 'scatter'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
