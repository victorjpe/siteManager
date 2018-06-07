import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SiteServiceProvider } from '../../providers/site-service/site-service';

/**
 * Generated class for the SitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-site',
  templateUrl: 'site.html',
})
export class SitePage {

  site: any = {};
  siteId: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private siteService: SiteServiceProvider) {
  }

  ionViewWillEnter() {
    this.siteId = this.navParams.data;
    this.siteService.getSiteReference(this.siteId).valueChanges()
      .subscribe(site => this.site = site);
  }

  navigate(id: number) {
    switch (id) {
      case 1: this.navCtrl.push('SiteLocationPage', this.siteId);
        break;
      case 2: this.navCtrl.push('BeforeWorkPage', this.siteId);
        break;
      case 3: this.navCtrl.push('PpeDetailsPage', this.siteId);
        break;
      case 4: this.navCtrl.push('CompletionReportPage', this.siteId);
        break;
    }
  }

}
