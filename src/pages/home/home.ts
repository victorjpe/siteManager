import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Site } from '../../providers/model/site';
import { User } from '../../providers/model/user';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private modalCtrl: ModalController,
    private fireDB: AngularFireDatabase
  ) { }

  sites: Observable<any[]>;
  currentUser: string;
  userAdmin: boolean;

  ionViewWillEnter(): void {
    this.currentUser = sessionStorage.getItem('user');
    this.fireDB.list('users', ref => ref.orderByChild('email').equalTo(this.currentUser)).valueChanges()
      .subscribe((users: User[]) => {
        if (users[0].roles.admin) {
          this.userAdmin = true;
        } else {
          this.userAdmin = false;
        }
      })
    this.sites = this.fireDB.list<Site[]>('sites', ref => ref.orderByChild('assignee').equalTo(this.currentUser)).valueChanges();
  }

  create() {
    let createModal = this.modalCtrl.create('CreateSitePage');
    createModal.present();
  }

}
