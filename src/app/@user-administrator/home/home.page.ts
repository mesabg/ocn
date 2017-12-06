import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
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

	public isAdmin:Boolean = false;

  constructor(private auth:AuthenticationService, public navCtrl:NavController, public navParams:NavParams) { }
	async ngOnInit() {
		await this.navCtrl.setRoot('app-administrator-home-page');
	}
	ionViewDidLoad(){ }
	ionViewWillLeave(){ }

	async ngAfterViewInit(){
		$('#content-app').css('top', '52px');
		$('#page-title').text('Inicio');
		let user = await this.auth.getUser();
        $('#user-image').attr('src', user.photo);
        $('#user-name').text(user.name);
		$('#user-email').text(user.email);

		if (user.type != 'employee') 
			this.isAdmin = true;

			
		
		let self = this;
		$('#goto-mis-tareas').unbind('click');
		$('#goto-mis-tareas').on('click', async function(){
			await self.navCtrl.push('app-administrator-my-tasks-page');
			document.getElementById("my-sidebar").style.display = "none";
			document.getElementById("fondo-sidebar").style.display = "none";
		});


		$('#goto-logout').unbind('click');
		$('#goto-logout').on('click', async function(){
			await self.navCtrl.setRoot('app-login-page');
			await self.navCtrl.popToRoot();
			document.getElementById("my-sidebar").style.display = "none";
			document.getElementById("fondo-sidebar").style.display = "none";
			await self.auth.logout();
		});

		$('#goto-finalizar').unbind('click');
		$('#goto-finalizar').on('click', async function(){
			await self.navCtrl.setRoot('app-jornada-page');
			await self.navCtrl.popToRoot();
			document.getElementById("my-sidebar").style.display = "none";
			document.getElementById("fondo-sidebar").style.display = "none";
		});
	}


	//-- Change page actions
	public async addTask(){
		await this.navCtrl.push('app-administrator-add-task-page');
	}

	public async myTasks(){
		await this.navCtrl.push('app-administrator-my-tasks-page');
	}

	public async activeTask(){
		await this.navCtrl.push('app-administrator-active-tasks-page');
	}

	public async tasksHistory(){
		await this.navCtrl.push('app-administrator-tasks-history-page');
	}
}
