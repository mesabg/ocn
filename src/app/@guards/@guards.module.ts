import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorGuard } from './administrator.guard';
import { GeneralGuard } from './general.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AdministratorGuard,
    GeneralGuard
  ]
})
export class GuardsModule { }
