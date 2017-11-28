import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { AuthenticationService } from '../../@services';
import { UserApi, TaskApi } from '../../@api';

@IonicPage({
	name: 'app-administrator-add-task-page',
	segment: 'administrator/add-task'
})
@Component({
  selector: 'app-administrator-add-task-page',
  templateUrl: './add-task.page.html',
  encapsulation: ViewEncapsulation.None
})
export class AddTaskPage implements OnInit {
	public tarea = {
		nombre:'',
		descripcion:''
	};
	
	public testArray = [];
	public selectedOnes = [];

	constructor(
		private auth:AuthenticationService, 
		private userApi:UserApi, 
		private taskApi:TaskApi,
		public navCtrl:NavController, 
		public navParams:NavParams) { }

	ngOnInit() { }
	ionViewDidLoad(){ }
	ionViewWillLeave(){ }

	async ngAfterViewInit(){
		$('#content-app').css('top', '52px');
		$('#page-title').text('Agregar Tarea');

		try {
			//-- Load User "Refresh save"
			let user = await this.auth.getUser();
			$('#user-image').attr('src', user.photo);
			$('#user-name').text(user.name);
			$('#user-email').text(user.email);

			//-- Load User list
			let response = await this.userApi.getAllUsers().toPromise();
			let users:any[] = response.data;
			this.testArray = [];
			users.forEach((template) => {
				let _user = template.usuario;
				this.testArray.push({
					id: _user.id,
					img: _user.photo,
					name: _user.name,
					email: _user.email
				});
			});

			//-- Add myself to the list
			let myself = await this.auth.getUser();
			this.testArray.push({
				id: myself.id,
				img: myself.photo,
				name: `${myself.name} (Yo)`,
				email: myself.email
			});

		} catch (reason) {
			console.log("An error ocurred :: ", reason);
		}


		//-- Event listening
		let self = this;
		$('#goto-inicio').unbind('click');
		$('#goto-inicio').on('click', function(){
			self.navCtrl.setRoot('app-administrator-home-page');
			self.navCtrl.popToRoot();
			document.getElementById("my-sidebar").style.display = "none";
			document.getElementById("fondo-sidebar").style.display = "none";
		});

		$('#goto-mis-tareas').unbind('click');
		$('#goto-mis-tareas').on('click', function(){
			self.navCtrl.push('app-administrator-my-tasks-page');
			document.getElementById("my-sidebar").style.display = "none";
			document.getElementById("fondo-sidebar").style.display = "none";
		});


		$('#goto-logout').unbind('click');
		$('#goto-logout').on('click', function(){
			self.navCtrl.setRoot('app-login-page');
			self.navCtrl.popToRoot();
			document.getElementById("my-sidebar").style.display = "none";
			document.getElementById("fondo-sidebar").style.display = "none";
		});

		$('#goto-finalizar').unbind('click');
		$('#goto-finalizar').on('click', function(){
			self.navCtrl.setRoot('app-login-page');
			self.navCtrl.popToRoot();
			document.getElementById("my-sidebar").style.display = "none";
			document.getElementById("fondo-sidebar").style.display = "none";
		});
	}


	public volver(){
		this.navCtrl.setRoot('app-administrator-home-page');
		this.navCtrl.popToRoot();
	}


	public async crearTask():Promise<any>{
		if (this.tarea.nombre == '' || this.tarea.descripcion == '' || this.selectedOnes.length == 0){
			//-- Faltan datos
			$("#tarea-error")
				.find('span')
				.text('Por favor complete los datos del formulario para poder realizar esta acción');
			$("#tarea-error").show();
			return;
		}

		//-- Enviar petición
		let ids = {};
		this.selectedOnes.forEach((usr) => {
			ids[usr.id] = usr.id;
		});
		let response = await this.taskApi.create(
			this.tarea.nombre, 
			this.tarea.descripcion,
			ids
		);

		//-- limpiar y mostrar success
		if (response.state === "success"){
			this.tarea.nombre = "";
			this.tarea.descripcion = "";
			this.selectedOnes = [];
			$("#tarea-creada").show();
		}else{
			this.tarea.nombre = "";
			this.tarea.descripcion = "";
			this.selectedOnes = [];
			$("#tarea-error")
				.find('span')
				.text('Ocurrió un error al registrar sus datos, por favor intente de nuevo');
			$("#tarea-error").show();
		}
	}


	//-- Other actions
	public addSelected(user){
		let res = this.selectedOnes.indexOf(user);
		if (res == -1) this.selectedOnes.push(user);
		else this.selectedOnes.splice(res, 1);
	}
}