/**
 * Global dependencies
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

/**
 * Pages dependencies
 */
import { MyTasksPage } from './my-tasks.page';

@NgModule({
    declarations: [MyTasksPage],
    imports: [
        IonicPageModule.forChild(MyTasksPage)
    ],
    entryComponents: [MyTasksPage],
    exports: [MyTasksPage]
})
export class MyTasksPageModule { }