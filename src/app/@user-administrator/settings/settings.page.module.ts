/**
 * Global dependencies
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

/**
 * Pages dependencies
 */
import { SettingsPage } from './settings.page';

@NgModule({
    declarations: [SettingsPage],
    imports: [
        IonicPageModule.forChild(SettingsPage)
    ],
    entryComponents: [SettingsPage],
    exports: [SettingsPage]
})
export class SettingsPageModule { }