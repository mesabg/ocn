import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

//-- Local imports
import { LoginModel } from '../../@model';
import { AuthenticationService } from '../../@services';



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
    public navCtrl:NavController, 
    public navParams:NavParams,
    private camera: Camera) { }

  ngOnInit() { 
    this.createForm(); 
    this.authentication.isLoggedIn()
    .then((auth) => {
      if (auth.loggedIn) this.authentication.redirect();
    })
    .catch((reason) => { /*DO NOTHING*/ });
  }

  //-- OnSubmit funcionallity
  onSubmit(loginData:LoginModel) {
    this.authentication.login(loginData.username, loginData.password)
    .then((usertype) => {
      this.takePicture()
      .then((picture) => {
        console.log("Picture :: ", picture);
        if (usertype === 'administrator') this.navCtrl.push('app-administrator-home-page');
        else if (usertype === 'general') this.navCtrl.push('app-general-home-page');
      })
      .catch((err) => { /*DO NOTHING*/ });
    });
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
