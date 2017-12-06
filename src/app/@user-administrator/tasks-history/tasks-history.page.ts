import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { AuthenticationService } from '../../@services';
import { UserApi, TaskApi } from '../../@api';


@IonicPage({
	name: 'app-administrator-tasks-history-page',
	segment: 'administrator/tasks-history'
})
@Component({
  selector: 'app-administrator-tasks-history-page',
  templateUrl: './tasks-history.page.html',
  encapsulation: ViewEncapsulation.None
})
export class TasksHistoryPage implements OnInit {
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
		$('#page-title').text('Historial de tareas');

		try {
			//-- Load User "Refresh save"
			let user = await this.auth.getUser();
			$('#user-image').attr('src', user.photo);
			$('#user-name').text(user.name);
			$('#user-email').text(user.email);

			//-- Load task list
			let response = await this.taskApi.getHistoryTasks();
			console.log("Response ", response);
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
		$('#goto-inicio').on('click', async function(){
			await self.navCtrl.setRoot('app-administrator-home-page');
			await self.navCtrl.popToRoot();
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


	public async volver(){
		await this.navCtrl.setRoot('app-administrator-home-page');
		await this.navCtrl.popToRoot();
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

	public async reabrirTarea(){
		try {
			let task = JSON.parse($('#detalle-tarea').attr('tarea'));
			let response = await this.taskApi.openTask(task.id);
			if (response.state != "success") throw new Error("Task not deleted");
			let id = null;
			this.tasks.forEach((task_, index) => {
				if (task_.id == task.id) id = index;
			});

			if (id != null) this.tasks.splice(id, 1);
			$('#detalle-tarea').hide();
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
