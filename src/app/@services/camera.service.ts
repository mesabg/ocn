import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraService {

    constructor(
        private camera: Camera,
        public platform: Platform) {}


    public async takePicture():Promise<File>{
        //-- Create options for the Camera Dialog
        var options:CameraOptions = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: false,
            correctOrientation: false,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            cameraDirection: this.camera.Direction.FRONT,
            destinationType: this.camera.DestinationType.DATA_URL
        };

        //-- Get image data depending on the platform
        if ( this.platform.is('mobileweb') ){
            //-- We are on browser
            console.log("We are on web");
            let base64Image:string = `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`;
            let byteCharacters = atob(base64Image);
            let byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++)
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            let byteArray = new Uint8Array(byteNumbers);
            let blob = new Blob([byteArray], {type: 'image/jpg'});
            let picture = new File([blob], "image.jpg");
            return picture;
        }else{
            //-- We are on a device
            console.log("We are on mobile");
            //alert("Mobile device");
            try {
                let base64Image:string = (await this.camera.getPicture(options));
                //alert("Image " + base64Image);
                let byteCharacters = atob(base64Image);
                let byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++)
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                let byteArray = new Uint8Array(byteNumbers);
                let blob = new Blob([byteArray], {type: 'image/jpg'});
                let picture = new File([blob], "image.jpg");
                //alert("Image after process :: " + picture.size);
                return picture;
            } catch (reason) {
                console.log("An error ocurred while open camera");
                alert("Ha ocurrido un error al tomar la foto");
            }
        }
    }
}