import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
	name: 'app-administrator-tasks-history-page',
	segment: 'administrator/tasks-history'
})
@Component({
  selector: 'app-administrator-tasks-history-page',
  templateUrl: './tasks-history.page.html',
  encapsulation: ViewEncapsulation.None
})
export class TasksHistoryPage implements OnInit {
  constructor(public navCtrl:NavController, public navParams:NavParams) { }
	ngOnInit() { }
	ionViewDidLoad(){ }
	ionViewWillLeave(){ }
}
