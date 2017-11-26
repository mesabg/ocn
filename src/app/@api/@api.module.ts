import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//-- Local
import { ApiModule as MsApiModule } from '../../@ms/api';
import { UserApi } from './user.api';
import { TaskApi } from './task.api';

@NgModule({
  imports: [
    CommonModule,
    MsApiModule
  ],
  providers:[
    UserApi,
    TaskApi
  ]
})
export class ApiModule { }
