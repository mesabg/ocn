import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
	name: 'app-general-home-page',
	segment: 'general/home'
})
@Component({
  selector: 'app-general-home-page',
  templateUrl: './home.page.html',
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
  constructor(public navCtrl:NavController, public navParams:NavParams) { }
	ngOnInit() { }
	ionViewDidLoad(){ }
	ionViewWillLeave(){ }
}
