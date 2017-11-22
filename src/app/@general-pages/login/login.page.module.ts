/**
 * Global dependencies
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

//-- Local
import { ServicesModule } from '../../@services';

/**
 * Pages dependencies
 */
import { LoginPage } from './login.page';

@NgModule({
    declarations: [LoginPage],
    imports: [
        ServicesModule,
        IonicPageModule.forChild(LoginPage)
    ],
    entryComponents: [LoginPage],
    exports: [LoginPage],
    providers: [
        Camera
    ]
})
export class LoginPageModule { }