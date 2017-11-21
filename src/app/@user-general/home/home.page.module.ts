/**
 * Global dependencies
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

/**
 * Pages dependencies
 */
import { HomePage } from './home.page';

@NgModule({
    declarations: [HomePage],
    imports: [
        IonicPageModule.forChild(HomePage)
    ],
    entryComponents: [HomePage],
    exports: [HomePage]
})
export class HomePageModule { }