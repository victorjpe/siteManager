import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FileUpload } from '../../providers/model/file-upload';
import { SiteServiceProvider } from '../../providers/site-service/site-service';

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

  constructor(
    private siteService: SiteServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  siteId: string;
  pictures: FileUpload[] = [];

  ionViewDidEnter(): void {
    this.siteId = this.navParams.data;
    this.siteService.getBeforeWorkPhotos(this.siteId).valueChanges()
      .subscribe((photos: FileUpload[]) => this.pictures = photos || []);
  }

  goBack(): void {
    this.navCtrl.pop();
  }

}
