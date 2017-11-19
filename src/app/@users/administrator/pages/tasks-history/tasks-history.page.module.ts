/**
 * Global dependencies
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

/**
 * Pages dependencies
 */
import { TasksHistoryPage } from './tasks-history.page';

@NgModule({
    declarations: [TasksHistoryPage],
    imports: [
        IonicPageModule.forChild(TasksHistoryPage)
    ],
    entryComponents: [TasksHistoryPage],
    exports: [TasksHistoryPage]
})
export class TasksHistoryPageModule { }