import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideBarComponent } from './side-bar';
import { TopBarComponent } from './top-bar';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SideBarComponent, 
    TopBarComponent
  ],
  exports: [
    SideBarComponent, 
    TopBarComponent
  ]
})
export class ComponentsModule { }
