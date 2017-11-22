import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { AuthenticationService } from '../../@services';

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

	public testArray = [
		{
			img: "assets/img/raffa.jpg",
			name: "Moisés Berenguer",
			email: "moises.berenguer@gmail.com"
		},
		{
			img: "assets/img/raffa.jpg",
			name: "Moisés Berenguer",
			email: "moises.berenguer@gmail.com"
		},
		{
			img: "assets/img/raffa.jpg",
			name: "Moisés Berenguer",
			email: "moises.berenguer@gmail.com"
		},
		{
			img: "assets/img/raffa.jpg",
			name: "Moisés Berenguer",
			email: "moises.berenguer@gmail.com"
		},
		{
			img: "assets/img/raffa.jpg",
			name: "Moisés Berenguer",
			email: "moises.berenguer@gmail.com"
		},
		{
			img: "assets/img/raffa.jpg",
			name: "Moisés Berenguer",
			email: "moises.berenguer@gmail.com"
		},
		{
			img: "assets/img/raffa.jpg",
			name: "Moisés Berenguer",
			email: "moises.berenguer@gmail.com"
		}
	];

	public selectedOnes = [];

	constructor(private auth:AuthenticationService, public navCtrl:NavController, public navParams:NavParams) { }
	ngOnInit() { }
	ionViewDidLoad(){ }
	ionViewWillLeave(){ }

	ngAfterViewInit(){
		$('#content-app').css('top', '52px');
		$('#page-title').text('Agregar Tarea');

		this.auth.getUser()
		.then((user) => {
			$('#user-image').attr('src', 'assets/img/raffa.jpg');
			$('#user-name').text(user.name);
			$('#user-email').text(user.email);
		});


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


	public volver(){
		this.navCtrl.setRoot('app-administrator-home-page');
		this.navCtrl.popToRoot();
	}


	public crearTask(){
		console.log(this.tarea, this.selectedOnes);
	}


	//-- Other actions
	public addSelected(user){
		let res = this.selectedOnes.indexOf(user);
		if (res == -1) this.selectedOnes.push(user);
		else this.selectedOnes.splice(res, 1);
	}
}