import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';

//-- Local
import { ApiModule } from '../@api';
import { AuthenticationService } from './authentication.service';
import { CTAService } from './cta.service';

@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    CTAService
  ]
})
export class ServicesModule { }
