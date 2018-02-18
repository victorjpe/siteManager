import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the SiteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SiteServiceProvider {

  currentUser: string;

  constructor(public angularfirebaseDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.currentUser = afAuth.auth.currentUser.phoneNumber;
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
    return this.angularfirebaseDB.list('site-details');
  }

  readDetails() {
    return this.angularfirebaseDB.list('')
  }

}
