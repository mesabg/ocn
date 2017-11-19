import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
	name: 'app-administrator-active-tasks-page',
	segment: 'active-tasks'
})
@Component({
  selector: 'app-administrator-active-tasks-page',
  templateUrl: './active-tasks.page.html',
  encapsulation: ViewEncapsulation.None
})
export class ActiveTasksPage implements OnInit {
  constructor(public navCtrl:NavController, public navParams:NavParams) { }
	ngOnInit() { }
	ionViewDidLoad(){ }
	ionViewWillLeave(){ }
}
