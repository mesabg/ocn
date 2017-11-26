/**
 * Global dependencies
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

/**
 * Pages dependencies
 */
import { AddTaskPage } from './add-task.page';
import { ServicesModule } from '../../@services';
import { ApiModule } from '../../@api';

@NgModule({
    declarations: [AddTaskPage],
    imports: [
        ServicesModule,
        ApiModule,
        IonicPageModule.forChild(AddTaskPage)
    ],
    entryComponents: [AddTaskPage],
    exports: [AddTaskPage]
})
export class AddTaskPageModule { }