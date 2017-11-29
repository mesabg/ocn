import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

//-- Local imports
import { LoginModel } from '../../@model';
import { AuthenticationService, CameraService } from '../../@services';
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
    private camera:CameraService) { }

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

  performClick(elemId) {
    document.getElementById(elemId).click();
 }


  ngAfterViewInit(){
    $('#content-app').css('top', '0px');
  }


  public async process(){
    try {
        
        let user = await this.authentication.getUser();
        let picture:File = await this.camera.takePicture();
        let photoResponse = await this.userApi.postCameraPhoto(picture);
        if (photoResponse.state != "success") throw new Error("Photo is not save");
    
        //-- Start process sending the coords
        let self = this;
        let resp = await self.geo.getCurrentPosition();
        let coordsResponse = await self.coordsApi.registerCoords(resp.coords.latitude, resp.coords.longitude);
        if (coordsResponse.state == "success"){
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
        }else{
          throw new Error("Coords are not save");
        }
    

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

  public async fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let response = await this.userApi.postCameraPhoto(file);
        console.log("Server response :: ", response);
    }
  }


  //-- Actions
  createForm(){
    this.loginForm = this.formBuilder.group({});
  }
}
