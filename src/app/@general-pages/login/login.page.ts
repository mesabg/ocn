import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

//-- Local imports
import { LoginModel } from '../../@model';
import { AuthenticationService } from '../../@services';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { CoordsApi, UserApi } from '../../@api';

@IonicPage({
	name: 'app-login-page',
	segment: 'login'
})
@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit {
  public loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authentication:AuthenticationService,
    private geo:Geolocation,
    private backgroundMode: BackgroundMode,
    private coordsApi:CoordsApi,
    private userApi:UserApi,
    public navCtrl:NavController, 
    public navParams:NavParams,
    private camera: Camera) { }

  async ngOnInit() { 
    this.createForm(); 
    //-- prevents the app from being paused while in background.
    this.backgroundMode.enable();

    try {
      let auth = await this.authentication.isLoggedIn();
      if (auth.loggedIn){
        this.navCtrl.setRoot('app-jornada-page');
        this.navCtrl.popToRoot();
      }else{
        throw new Error("Not logged in");
      }
    } catch (reason) {
      console.log("An error ocurred :: ", reason);
    }
  }

  //-- OnSubmit funcionallity
  public async onSubmit(loginData:LoginModel){
    try {
      let logged = await this.authentication.login(loginData.username, loginData.password);
      if (logged == "not-logged-in") throw new Error("User authentication failed");
      this.navCtrl.setRoot('app-jornada-page');
      this.navCtrl.popToRoot();
    } catch (reason) {
      console.log("Error on submit (login) :: ", reason);
    }
  }

  //-- Actions
  createForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }
}
