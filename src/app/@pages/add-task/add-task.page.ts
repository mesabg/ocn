import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
	name: 'app-administrator-add-task-page',
	segment: 'add-task'
})
@Component({
  selector: 'app-administrator-add-task-page',
  templateUrl: './add-task.page.html',
  encapsulation: ViewEncapsulation.None
})
export class AddTaskPage implements OnInit {
  constructor(public navCtrl:NavController, public navParams:NavParams) { }
	ngOnInit() { }
	ionViewDidLoad(){ }
	ionViewWillLeave(){ }
}