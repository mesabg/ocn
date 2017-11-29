import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';

//-- Local
import { ApiModule } from '../@api';
import { AuthenticationService } from './authentication.service';
import { CTAService } from './cta.service';
import { CameraService } from './camera.service';

@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    Camera,
    AuthenticationService,
    CTAService,
    CameraService
  ]
})
export class ServicesModule { }
