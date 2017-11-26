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
import { MyTasksPage } from './my-tasks.page';

@NgModule({
    declarations: [MyTasksPage],
    imports: [
        ServicesModule,
        ApiModule,
        IonicPageModule.forChild(MyTasksPage)
    ],
    entryComponents: [MyTasksPage],
    exports: [MyTasksPage]
})
export class MyTasksPageModule { }