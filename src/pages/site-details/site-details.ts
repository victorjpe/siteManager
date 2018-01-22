import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SiteServiceProvider } from '../../providers/site-service/site-service';

/**
 * Generated class for the SiteDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-site-details',
  templateUrl: 'site-details.html',
})
export class SiteDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private siteService: SiteServiceProvider) {
  }
  vendors: string[];
  typeOfWorks: string[];
  info: any = {};

  ionViewDidLoad() {
    console.log('ionViewDidLoad SiteDetailsPage');
    this.siteService.readVendors().valueChanges()
      .subscribe(result => this.vendors = result);
    this.siteService.readTypeOfWorks().valueChanges()
      .subscribe(result => this.typeOfWorks =  result);
  }

}
