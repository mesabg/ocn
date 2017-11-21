import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
	name: 'app-administrator-home-page',
	segment: 'administrator/home'
})
@Component({
  selector: 'app-administrator-home-page',
  templateUrl: './home.page.html',
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
  constructor(public navCtrl:NavController, public navParams:NavParams) { }
	ngOnInit() { }
	ionViewDidLoad(){ }
	ionViewWillLeave(){ }
}
