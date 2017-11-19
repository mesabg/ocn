import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//-- Pages && Local imports
import { LoginPage } from './login';
import { RegisterPage } from './register';
import { ServicesModule } from '../@services';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ServicesModule
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
