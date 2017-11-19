import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//-- Pages
import { ActiveTasksPageModule } from './active-tasks';
import { AddTaskPageModule } from './add-task';
import { HomePageModule } from './home';
import { MyTasksPageModule } from './my-tasks';
import { SettingsPageModule } from './settings';
import { TasksHistoryPageModule } from './tasks-history';

@NgModule({
  imports: [
    CommonModule,
    ActiveTasksPageModule,
    AddTaskPageModule,
    HomePageModule,
    MyTasksPageModule,
    SettingsPageModule,
    TasksHistoryPageModule
  ]
})
export class PagesModule { }
