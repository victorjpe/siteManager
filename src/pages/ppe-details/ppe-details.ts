import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { UploadServiceProvider } from '../../providers/upload-service/upload-service';
import { FileUpload } from '../../providers/model/file-upload';
import { SiteServiceProvider } from '../../providers/site-service/site-service';


/**
 * Generated class for the PpeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ppe-details',
  templateUrl: 'ppe-details.html',
})
export class PpeDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera, private loadingCtrl: LoadingController,
    private uploadService: UploadServiceProvider, private siteService: SiteServiceProvider) {
  }
  siteId: string;
  progress: { percentage: number } = { percentage: 0 }
  enableSave: boolean;
  pictures: FileUpload[] = [];
  options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  ionViewDidEnter(): void {
    this.siteId = this.navParams.data;
    this.siteService.getPPEPhotos(this.siteId).valueChanges()
      .subscribe((photos: FileUpload[]) => this.pictures = photos || []);
  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.save(new FileUpload(imageData, `${this.siteId}_PPE${this.pictures.length + 1}.jpg`));
    }, (err) => console.log(err));
  }

  save(picture: FileUpload) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    this.uploadService.pushFileToStorage(picture, `${this.siteId}/ppe/`)
      .take(1).subscribe(() => {
        loading.dismiss();
      });
  }

  goBack(): void {
    this.navCtrl.pop();
  }

}
