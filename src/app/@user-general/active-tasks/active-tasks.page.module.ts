/**
 * Global dependencies
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

/**
 * Pages dependencies
 */
import { ActiveTasksPage } from './active-tasks.page';

@NgModule({
    declarations: [ActiveTasksPage],
    imports: [
        IonicPageModule.forChild(ActiveTasksPage)
    ],
    entryComponents: [ActiveTasksPage],
    exports: [ActiveTasksPage]
})
export class ActiveTasksPageModule { }