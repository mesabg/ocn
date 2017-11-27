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
import { TasksHistoryPage } from './tasks-history.page';

@NgModule({
    declarations: [TasksHistoryPage],
    imports: [
        ServicesModule,
        ApiModule,
        IonicPageModule.forChild(TasksHistoryPage)
    ],
    entryComponents: [TasksHistoryPage],
    exports: [TasksHistoryPage]
})
export class TasksHistoryPageModule { }