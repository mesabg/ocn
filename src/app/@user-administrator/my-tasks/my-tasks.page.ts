import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { AuthenticationService } from '../../@services';
import { UserApi, TaskApi } from '../../@api';

@IonicPage({
	name: 'app-administrator-my-tasks-page',
	segment: 'administrator/my-tasks'
})
@Component({
  selector: 'app-administrator-my-tasks-page',
  templateUrl: './my-tasks.page.html',
  encapsulation: ViewEncapsulation.None
})
export class MyTasksPage implements OnInit, AfterViewInit {
	//-- Varables
	public tasks:any[];
	public comentario:string;

  constructor(
		private auth:AuthenticationService, 
		private userApi:UserApi, 
		private taskApi:TaskApi,
		public navCtrl:NavController, 
		public navParams:NavParams) { }

	ngOnInit() { }

	async ngAfterViewInit(){
		$('#content-app').css('top', '52px');
		$('#page-title').text('Mis Tareas');

		try {
			//-- Load User "Refresh save"
			let user = await this.auth.getUser();
			$('#user-image').attr('src', user.photo);
			$('#user-name').text(user.name);
			$('#user-email').text(user.email);

			//-- Load task list
			let response = await this.taskApi.retrieveAll();
			if (response.state === "success"){
				this.tasks = response.data;
			}else{
				throw new Error("An error ocurred");
			}

		} catch (reason) {
			console.log("An error ocurred :: ", reason);
		}


		//-- Event listening
		$('#goto-inicio').unbind('click');
		let self = this;
		$('#goto-inicio').on('click', function(){
			self.navCtrl.setRoot('app-administrator-home-page');
			self.navCtrl.popToRoot();
			document.getElementById("my-sidebar").style.display = "none";
			document.getElementById("fondo-sidebar").style.display = "none";
		});
	}

	ionViewDidLoad(){ }
	ionViewWillLeave(){ }


	//-- Some functions
	public desplegarTarea(task:any){
		$('#detalle-tarea').show();
		$('#detalle-tarea').attr('tarea', JSON.stringify(task));
		$('.the-title').text(task.title);
		$('.the-description').text(task.description);
		$('#the-date').text(task.created_at);
		console.log("Tarea det :: ", task);
	}


	public volver(){
		this.navCtrl.setRoot('app-administrator-home-page');
		this.navCtrl.popToRoot();
	}


	public async crearComment(){
		let task = JSON.parse($('#detalle-tarea').attr('tarea'));
		if (this.comentario == "") return;

		try {
			let response = await this.taskApi.comment(task.id, this.comentario);
			if (response.state != "success") throw new Error("API error while saving comment");
			
		} catch (reason) {
			console.log("An error ocurred :: ", reason);
		}
	}
}