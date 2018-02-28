import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the BeforeWorkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-before-work',
  templateUrl: 'before-work.html',
})
export class BeforeWorkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
  }

  picture: any;
  options: CameraOptions = {
    quality: 90,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeforeWorkPage');
  }

  takePicture(){
    this.camera.getPicture(this.options).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {});
  }

}
