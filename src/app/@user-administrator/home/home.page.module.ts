/**
 * Global dependencies
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

/**
 * Pages dependencies
 */
import { HomePage } from './home.page';
import { ServicesModule } from '../../@services';

@NgModule({
    declarations: [HomePage],
    imports: [
        ServicesModule,
        IonicPageModule.forChild(HomePage)
    ],
    entryComponents: [HomePage],
    exports: [HomePage]
})
export class HomePageModule { }