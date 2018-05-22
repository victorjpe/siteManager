import { Component, Input } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';

import { FileUpload } from '../../providers/model/file-upload';
import { UploadServiceProvider } from '../../providers/upload-service/upload-service';

@Component({
  selector: 'picture-list',
  templateUrl: './picture-list.component.html'
})
export class PictureListComponent {

  @Input() pictures: FileUpload[];
  @Input() noOfImages: number;
  @Input() page: string;
  @Input() siteId: string;

  options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  loading: any;

  constructor(
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private uploadService: UploadServiceProvider
  ) { }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.save(new FileUpload(imageData, `${this.siteId}_${this.page}${this.pictures.length + 1}.jpg`));
    });
  }

  save(picture: FileUpload) {
    this.showLoading();
    this.uploadService.pushFileToStorage(picture, `${this.siteId}/${this.page}/`)
      .take(1).subscribe(() => this.hideloading());
  }

  showLoading(): void {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  hideloading(): void {
    this.loading.dismiss();
  }

  delete(picture: FileUpload): void {
    this.uploadService.deletePicture(`${this.siteId}/${this.page}/`,picture);
  }
}
