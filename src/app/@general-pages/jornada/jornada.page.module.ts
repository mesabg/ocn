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
import { JornadaPage } from './jornada.page';

@NgModule({
    declarations: [JornadaPage],
    imports: [
        ServicesModule,
        ApiModule,
        IonicPageModule.forChild(JornadaPage)
    ],
    entryComponents: [JornadaPage],
    exports: [JornadaPage],
    providers: [
        Camera,
        Geolocation,
        BackgroundMode
    ]
})
export class JornadaPageModule { }