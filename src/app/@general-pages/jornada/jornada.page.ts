import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

//-- Local imports
import { LoginModel } from '../../@model';
import { AuthenticationService } from '../../@services';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { CoordsApi, UserApi } from '../../@api';
import $ from 'jquery';

@IonicPage({
	name: 'app-jornada-page',
	segment: 'jornada'
})
@Component({
  selector: 'app-jornada-page',
  templateUrl: './jornada.page.html',
  encapsulation: ViewEncapsulation.None
})
export class JornadaPage implements OnInit, AfterViewInit {
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
      if (auth.loggedIn) { console.log("User is logged in"); }
      else throw new Error("Not logged in");
    } catch (reason) {
      console.log("An error ocurred :: ", reason);
    }
  }

  ngAfterViewInit(){
    $('#content-app').css('top', '0px');
  }


  public async process(){
    try {
        
        let user = await this.authentication.getUser();
        let picture = await this.takePicture();

        try {
            await this.userApi.postPhoto(picture);
        } catch (_photo) {
            console.log("Not throw error, picture error");
        }
    
        //-- Start process sending the coords
        let self = this;
        let resp = await self.geo.getCurrentPosition();

        let apiResponse = { state:"success" };
        try {
          let apiResponse = await self.coordsApi.registerCoords(resp.coords.latitude, resp.coords.longitude);
        } catch (_photo) {
            console.log("Not throw error, picture error");
        }
    
        //if (apiResponse.state == "success"){
          //-- Send coords programmed
    
          setInterval(async function(){
            try {
              let resp = await self.geo.getCurrentPosition();
              let apiResponse = await self.coordsApi.registerCoords(resp.coords.latitude, resp.coords.longitude);
              console.log("Api response for coords :: ", apiResponse);
            } catch (reason) {
              console.log("An error ocurred :: ", reason);
            }
          }, 300000);
    
        //}
    
        this.navCtrl.setRoot('app-administrator-home-page');
        this.navCtrl.popToRoot();

    } catch (reason) {
        console.log("An error ocurred :: ", reason);
    }
  }


    //-- OnSubmit funcionallity
    public async onSubmit(loginData:LoginModel){
        this.process();
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
    this.loginForm = this.formBuilder.group({});
  }
}
