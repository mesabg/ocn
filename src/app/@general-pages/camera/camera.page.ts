import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

//-- Local imports


@IonicPage({
	name: 'app-camera-page',
	segment: 'camera'
})
@Component({
  selector: 'app-camera-page',
  templateUrl: './camera.page.html',
  encapsulation: ViewEncapsulation.None
})
export class CameraPage implements OnInit {
    constructor(private camera: Camera) { }
    ngOnInit() {
        this.takePicture();
    }

    public takePicture():void{
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }
          
        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
        });
    }
}
