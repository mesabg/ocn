import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
	name: 'app-administrator-settings-page',
	segment: 'settings'
})
@Component({
  selector: 'app-administrator-settings-page',
  templateUrl: './settings.page.html',
  encapsulation: ViewEncapsulation.None
})
export class SettingsPage implements OnInit {
  constructor(public navCtrl:NavController, public navParams:NavParams) { }
	ngOnInit() { }
	ionViewDidLoad(){ }
	ionViewWillLeave(){ }
}
