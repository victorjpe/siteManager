import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/take';

/*
  Generated class for the SiteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SiteServiceProvider {

  currentUser: string;

  constructor(public angularfirebaseDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.currentUser = this.afAuth.auth.currentUser.email;
  }

  readDistricts(): AngularFireList<string> {
    return this.angularfirebaseDB.list('districts');
  }

  readTypeOfWorks(): AngularFireList<string> {
    return this.angularfirebaseDB.list('type_of_works');
  }

  readVendors(): AngularFireList<string> {
    return this.angularfirebaseDB.list('vendors');
  }

  saveSiteDetails() {
    return this.angularfirebaseDB.object(this.currentUser + '/siteDetails');
  }

  readDetails() {
    return this.angularfirebaseDB.list('')
  }

  createNewSite() {
    this.angularfirebaseDB.list('sites').push({user: this.currentUser, status: "PENDING"});
  }

  getPendingSiteDetails() {
    return this.angularfirebaseDB.list('sites', ref => ref.orderByChild('user').equalTo(this.currentUser));
  }

}
