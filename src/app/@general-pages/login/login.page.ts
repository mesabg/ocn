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

  async ngOnInit() { 
    this.createForm(); 

    try {
      let auth = await this.authentication.isLoggedIn();
      if (auth.loggedIn){
        if (auth.type === 'administrator' || auth.type === 'root' || auth.type === 'supervisor') 
          this.navCtrl.push('app-administrator-home-page');
        else if (auth.type === 'employee') 
          this.navCtrl.push('app-general-home-page');
      }
    } catch (reason) {
      console.log("An error ocurred :: ", reason);
    }
  }

  //-- OnSubmit funcionallity
  public async onSubmit(loginData:LoginModel){
    try {
      await this.authentication.login(loginData.username, loginData.password);
      let user = await this.authentication.getUser();
      console.log("User data is :: ", user);
      let picture = await this.takePicture();
      console.log("Picture :: ", picture);

      if (user.type === 'administrator' || user.type === 'root' || user.type === 'supervisor') this.navCtrl.push('app-administrator-home-page');
      else if (user.type === 'employee') this.navCtrl.push('app-general-home-page');
    } catch (reason) {
      console.log("Error on submit :: ", reason);
    }

    /*.then((usertype) => {
      this.takePicture()
      .then((picture) => {
        console.log("Picture :: ", picture);
        if (usertype === 'administrator' || usertype === 'root' || usertype === 'supervisor') this.navCtrl.push('app-administrator-home-page');
        else if (usertype === 'employee') this.navCtrl.push('app-general-home-page');
      })
      .catch((err) => { });
    });*/
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
