import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { Geofence } from '@ionic-native/geofence';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private camera: Camera, private geolocation: Geolocation, private geofence: Geofence) {
    geofence.initialize().then(
      // resolved promise does not return a value
      () => console.log('Geofence Plugin Ready'),
      (err) => console.log(err)
    )
   }

  pict: any;
  options: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  pictures = [];
  info: any = {};

  takePicture(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.pictures.push('data:image/jpeg;base64,' + imageData);
     }, (err) => {
        console.log('error in camera');
     });
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.info.latitude = resp.coords.latitude;
      this.info.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  setFence() {
    this.addGeofence();
  }

  private addGeofence() {
    //options describing geofence
    let fence = {
      id: 'werathhwjhwrrtt_hjabfhjbgewjg-u6378599', //any unique ID
      latitude:       this.info.latitude, //center of geofence radius
      longitude:      this.info.longitude,
      radius:         10, //radius to edge of geofence in meters
      transitionType: 3, //see 'Transition Types' below
      notification: { //notification settings
          id:             1, //any unique ID
          title:          'You crossed a fence', //notification title
          text:           'You just arrived to Gliwice city center.', //notification body
          openAppOnClick: true //open app when notification is tapped
      }
    }

    this.geofence.addOrUpdate(fence).then(
      () => console.log('Geofence added'),
      (err) => console.log('Geofence failed to add')
    );
  }

}
