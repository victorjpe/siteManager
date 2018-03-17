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

  site: any;

  createNewSiteDetails() {
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
              this.siteService.createNewSite(data.siteName).valueChanges()
                .take(1).subscribe(site => this.site = site);
            }
          }
        }
      ]
    });
    alertPopup.present();
  }

  retrieveSiteDetails() {
    this.siteService.loadExistingSites().snapshotChanges().take(1)
      .subscribe(data => {
        let inputs = []
        data.forEach(item => {
          inputs.push({
            type: 'radio',
            label: item.payload.val().siteName,
            value: item.key
          })
        })
        let alertPopup = this.alertCtrl.create({
          title: 'Select a site',
          inputs: inputs,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Select',
              handler: data => {
                if (data) {
                  this.siteService.getSiteReference(data).valueChanges()
                    .take(1).subscribe(site => this.site = site);
                }
              }
            }
          ]
        });
        alertPopup.present();
      });
  }

  navigate(id: number) {
    switch (id) {
      case 1: this.navCtrl.push('SiteDetailsPage', this.site.id);
        break;
      case 2: this.navCtrl.push('BeforeWorkPage', this.site.id);
        break;
      case 3: this.navCtrl.push('PpeDetailsPage', this.site.id);
        break;
      case 4: this.navCtrl.push('CompletionReportPage', this.site.id);
        break;
    }
  }

}
