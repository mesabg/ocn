import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//-- Pages
import { LoginPage } from './login';
import { RegisterPage } from './register';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoginPage, 
    RegisterPage
  ],
  exports: [
    LoginPage, 
    RegisterPage
  ]
})
export class GeneralPagesModule { }
