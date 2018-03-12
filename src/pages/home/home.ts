import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { SiteServiceProvider } from '../../providers/site-service/site-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private siteService: SiteServiceProvider) { }

  info: any = {};

  createNewSiteDetails() {
    this.siteService.createNewSite();
  }

  retrieveSiteDetails(){
    this.siteService.getPendingSiteDetails();
  }

  navigate(id: number) {
    switch (id) {
      case 1: this.navCtrl.push('SiteDetailsPage');
        break;
      case 2: this.navCtrl.push('BeforeWorkPage');
        break;
      case 3: this.navCtrl.push('PpeDetailsPage');
        break;
      case 4: this.navCtrl.push('CompletionReportPage');
        break;
    }
  }

}
