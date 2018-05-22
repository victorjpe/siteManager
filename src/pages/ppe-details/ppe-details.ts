import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private siteService: SiteServiceProvider
  ) {
  }
  siteId: string;
  pictures: FileUpload[] = [];

  ionViewDidEnter(): void {
    this.siteId = this.navParams.data;
    this.siteService.getPPEPhotos(this.siteId).valueChanges()
      .subscribe((photos: FileUpload[]) => this.pictures = photos || []);
  }

  goBack(): void {
    this.navCtrl.pop();
  }

}
