import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import jquery from 'jquery';
import { AuthenticationService } from '../../@services';


@IonicPage({
	name: 'app-administrator-home-page',
	segment: 'administrator/home'
})
@Component({
  selector: 'app-administrator-home-page',
  templateUrl: './home.page.html',
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit, AfterViewInit {
  constructor(private auth:AuthenticationService, public navCtrl:NavController, public navParams:NavParams) { }
	ngOnInit() { }
	ionViewDidLoad(){ }
	ionViewWillLeave(){ }

	ngAfterViewInit(){
		jquery('#content-app').css('top', '52px');
		jquery('#page-title').text('Inicio');

		this.auth.getUser()
		.then((user) => {
			jquery('#user-image').attr('src', 'assets/img/raffa.jpg');
			jquery('#user-name').text(user.name);
			jquery('#user-email').text(user.email);
		});
	}


	//-- Change page actions
	public addTask(){
		this.navCtrl.push('app-administrator-add-task-page');
	}

	public myTasks(){
		this.navCtrl.push('app-administrator-my-tasks-page');
	}

	public activeTask(){
		this.navCtrl.push('app-administrator-active-tasks-page');
	}

	public tasksHistory(){
		this.navCtrl.push('app-administrator-tasks-history-page');
	}
}
