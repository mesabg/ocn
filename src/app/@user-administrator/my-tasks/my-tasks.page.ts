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
	public commented:any[] = [];

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
	public async desplegarTarea(task:any){
		$('#detalle-tarea').show();
		$('#detalle-tarea').attr('tarea', JSON.stringify(task));
		$('.the-title').text(task.title);
		$('.the-description').text(task.description);
		$('#the-date').text(task.created_at);


		//-- Armar los comentarios
		this.commented = [];
		task.comments.forEach( async (com) => {
			let response = await this.userApi.getUserById(com.user_id);
			let user = response.data;
			this.commented.push({
				name: `${user.name} ${user.lastName}`,
				comment: com.comment,
				img: user.photo
			});
		});

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
			let user = await this.auth.getUser();

			this.commented.push({
				name: user.name,
				comment: this.comentario,
				img: user.photo
			});

			this.comentario = "";
			
		} catch (reason) {
			console.log("An error ocurred :: ", reason);
		}
	}

	public async finalizarTarea(){
		try {
			let task = JSON.parse($('#detalle-tarea').attr('tarea'));
			let response = await this.taskApi.endTask(task.id);

			let res = this.tasks.indexOf(task);
			if (res == -1) {}
			else this.tasks.splice(res, 1);

			$('#detalle-tarea').hide();

			console.log("Status change :: ", response);
		} catch (reason) {
			console.log("An error ocurred :: ", reason);
		}
	}

	public cerrarDescripcion(){
		$('#detalle-tarea').hide();
		this.commented = [];
		this.comentario = "";
	}
}