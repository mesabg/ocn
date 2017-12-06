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
        alert("Debo tomar una foto");
        try {
            let base64Image:string = (await this.camera.getPicture(options));
            let byteCharacters = atob(base64Image);
            let byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++)
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            let byteArray = new Uint8Array(byteNumbers);
            let blob = new Blob([byteArray], {type: 'image/jpg'});
            let picture = new File([blob], "image.jpg");
            return picture;
        } catch (reason) {
            console.log("An error ocurred while open camera");
            alert("Ha ocurrido un error al tomar la foto");
        }
    }
}