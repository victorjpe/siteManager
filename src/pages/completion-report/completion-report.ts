import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { FileUpload } from '../../providers/model/file-upload';
import { SiteServiceProvider } from '../../providers/site-service/site-service';

/**
 * Generated class for the CompletionReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-completion-report',
  templateUrl: 'completion-report.html',
})
export class CompletionReportPage {

  constructor(
    private siteService: SiteServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }
  siteId: string;
  progress: { percentage: number } = { percentage: 0 }
  enableSave: boolean;
  pictures: FileUpload[] = [];

  ionViewDidEnter(): void {
    this.siteId = this.navParams.data;
    this.siteService.getCompletePhotos(this.siteId).valueChanges()
      .subscribe((photos: FileUpload[]) => this.pictures = photos || []);
  }

  goBack(): void {
    this.navCtrl.pop();
  }

}
