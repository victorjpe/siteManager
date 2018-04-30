import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Site } from '../../providers/model/site';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private alertCtrl: AlertController,
    private fireDB: AngularFireDatabase
  ) { }

  sites: Observable<any[]>;
  currentUser: string;

  ionViewWillEnter(): void {
    this.currentUser = sessionStorage.getItem('user');
    this.sites = this.fireDB.list<Site[]>('sites', ref => ref.orderByChild('user').equalTo(this.currentUser)).valueChanges();
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
              this.createNewSite(data.siteName);
            }
          }
        }
      ]
    });
    alertPopup.present();
  }

  createNewSite(name: string) {
    const pushId = this.fireDB.createPushId();
    this.fireDB.list('sites').set(pushId, { id: pushId, user: this.currentUser, siteName: name });
  }

}
