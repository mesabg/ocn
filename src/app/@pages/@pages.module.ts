import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//-- Pages
import { ActiveTasksPage } from './active-tasks';
import { AddTaskPage } from './add-task';
import { HomePage } from './home';
import { MyTasksPage } from './my-tasks';
import { SettingsPage } from './settings';
import { TasksHistoryPage } from './tasks-history';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ActiveTasksPage,
    AddTaskPage,
    HomePage,
    MyTasksPage,
    SettingsPage,
    TasksHistoryPage,
  ],
  entryComponents: [
    ActiveTasksPage,
    AddTaskPage,
    HomePage,
    MyTasksPage,
    SettingsPage,
    TasksHistoryPage,
  ],
  exports: [
    ActiveTasksPage,
    AddTaskPage,
    HomePage,
    MyTasksPage,
    SettingsPage,
    TasksHistoryPage,
  ]
})
export class PagesModule { }
