import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import { ScatterComponent } from './pie/scatter.component';
import { ColumnComponent } from './column/column.component';

@NgModule({
  declarations: [
    AppComponent,
    ScatterComponent,
    ColumnComponent
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
