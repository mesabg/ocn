import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';

import { AuthenticationService } from './authentication.service';
import { CTAService } from './cta.service';

@NgModule({
  imports: [
    CommonModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    CTAService
  ]
})
export class ServicesModule { }
