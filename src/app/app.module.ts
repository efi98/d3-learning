import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import { ScatterComponent } from './scatter/scatter.component';
import { ColumnComponent } from './column/column.component';
import { LineComponent } from './line/line.component';

@NgModule({
  declarations: [
    AppComponent,
    ScatterComponent,
    ColumnComponent,
    LineComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
