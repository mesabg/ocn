import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
	name: 'app-general-settings-page',
	segment: 'general/settings'
})
@Component({
  selector: 'app-general-settings-page',
  templateUrl: './settings.page.html',
  encapsulation: ViewEncapsulation.None
})
export class SettingsPage implements OnInit {
  constructor(public navCtrl:NavController, public navParams:NavParams) { }
	ngOnInit() { }
	ionViewDidLoad(){ }
	ionViewWillLeave(){ }
}
