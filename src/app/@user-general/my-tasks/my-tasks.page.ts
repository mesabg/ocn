import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
	name: 'app-administrator-my-tasks-page',
	segment: 'administrator/my-tasks'
})
@Component({
  selector: 'app-administrator-my-tasks-page',
  templateUrl: './my-tasks.page.html',
  encapsulation: ViewEncapsulation.None
})
export class MyTasksPage implements OnInit {
  constructor(public navCtrl:NavController, public navParams:NavParams) { }
	ngOnInit() { }
	ionViewDidLoad(){ }
	ionViewWillLeave(){ }
}