/**
 * Global dependencies
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

//-- Local
import { ServicesModule } from '../../@services';

/**
 * Pages dependencies
 */
import { CameraPage } from './camera.page';

@NgModule({
    declarations: [CameraPage],
    imports: [
        ServicesModule,
        IonicPageModule.forChild(CameraPage)
    ],
    entryComponents: [CameraPage],
    exports: [CameraPage]
})
export class CameraPageModule { }