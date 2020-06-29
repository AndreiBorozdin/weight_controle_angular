import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './components/navigation/header/header.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [LoaderComponent, HeaderComponent],
  imports: [
    CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule
  ],
  exports: [LoaderComponent,
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class SharedModule { }
