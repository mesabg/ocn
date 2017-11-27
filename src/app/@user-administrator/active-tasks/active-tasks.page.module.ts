/**
 * Global dependencies
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesModule } from '../../@services';
import { ApiModule } from '../../@api';

/**
 * Pages dependencies
 */
import { ActiveTasksPage } from './active-tasks.page';

@NgModule({
    declarations: [ActiveTasksPage],
    imports: [
        ServicesModule,
        ApiModule,
        IonicPageModule.forChild(ActiveTasksPage)
    ],
    entryComponents: [ActiveTasksPage],
    exports: [ActiveTasksPage]
})
export class ActiveTasksPageModule { }