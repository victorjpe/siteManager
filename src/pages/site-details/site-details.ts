import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  info: any = {};

  ionViewDidLoad() {
    console.log('ionViewDidLoad SiteDetailsPage');
  }

}
