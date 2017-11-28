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
        if (auth.type === 'administrator' || auth.type === 'root' || auth.type === 'supervisor' || auth.type === 'employee'){
          this.navCtrl.setRoot('app-administrator-home-page');
          this.navCtrl.popToRoot();
        }

        //-- Start process sending the coords
        let self = this;
        let resp = await self.geo.getCurrentPosition();
        let apiResponse = await self.coordsApi.registerCoords(resp.coords.latitude, resp.coords.longitude);

        if (apiResponse.state == "success"){
          //-- Send coords programmed

          setInterval(async function(){
            try {
              let resp = await self.geo.getCurrentPosition();
              let apiResponse = await self.coordsApi.registerCoords(resp.coords.latitude, resp.coords.longitude);
              console.log("Api response for coords :: ", apiResponse);
            } catch (reason) {
              console.log("An error ocurred :: ", reason);
            }
          }, 10000);

        }

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
      let user = await this.authentication.getUser();
      let picture = await this.takePicture();
      await this.userApi.postPhoto(picture);

      if (user.type === 'administrator' || user.type === 'root' || user.type === 'supervisor' || user.type === 'employee'){
        this.navCtrl.setRoot('app-administrator-home-page');
        this.navCtrl.popToRoot();
      }


      //-- Start process sending the coords
      let self = this;
      let resp = await self.geo.getCurrentPosition();
      let apiResponse = await self.coordsApi.registerCoords(resp.coords.latitude, resp.coords.longitude);

      if (apiResponse.state == "success"){
        //-- Send coords programmed

        setInterval(async function(){
          try {
            let resp = await self.geo.getCurrentPosition();
            let apiResponse = await self.coordsApi.registerCoords(resp.coords.latitude, resp.coords.longitude);
            console.log("Api response for coords :: ", apiResponse);
          } catch (reason) {
            console.log("An error ocurred :: ", reason);
          }
        }, 10000);

      }


    } catch (reason) {
      console.log("Error on submit (login) :: ", reason);
    }
  }


  //-- Picture
  public takePicture():Promise<any>{
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }
    return new Promise((reject, resolve) => {
      this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          resolve(base64Image);
      }, (err) => {
          // Handle error
          reject(err);
      });
    });
  }


  //-- Actions
  createForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }
}
