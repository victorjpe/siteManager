import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';

import { SiteServiceProvider } from '../../providers/site-service/site-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private siteService: SiteServiceProvider,
    private alertCtrl: AlertController) { }

  sites: any[] = [];
  ionViewWillEnter(): void {
    this.siteService.loadExistingSites().valueChanges().subscribe((sites) => this.sites = sites);
  }

  create() {
    let alertPopup = this.alertCtrl.create({
      title: 'Create a new Site details',
      inputs: [
        {
          name: 'siteName',
          placeholder: 'Site Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Create',
          handler: data => {
            if (data.siteName) {
              this.siteService.createNewSite(data.siteName);
            }
          }
        }
      ]
    });
    alertPopup.present();
  }

}
