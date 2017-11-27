/**
 * Global dependencies
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

//-- Local
import { ServicesModule } from '../../@services';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ApiModule } from '../../@api';

/**
 * Pages dependencies
 */
import { LoginPage } from './login.page';

@NgModule({
    declarations: [LoginPage],
    imports: [
        ServicesModule,
        ApiModule,
        IonicPageModule.forChild(LoginPage)
    ],
    entryComponents: [LoginPage],
    exports: [LoginPage],
    providers: [
        Camera,
        Geolocation,
        BackgroundMode
    ]
})
export class LoginPageModule { }