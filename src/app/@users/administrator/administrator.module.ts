import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//-- Local
import { Layout } from './layout';
import { PagesModule } from './pages';
import { AdministratorRoutingModule } from './administrator.routing';

@NgModule({
  imports: [
    CommonModule,
    PagesModule,
    AdministratorRoutingModule
  ],
  declarations: [
    Layout
  ]
})
export class AdministratorModule { }
