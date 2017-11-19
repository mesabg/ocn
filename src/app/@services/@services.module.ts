import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationService } from './authentication.service';
import { CTAService } from './cta.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationService,
    CTAService
  ]
})
export class ServicesModule { }
