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

  constructor(public fireDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged(user => {
      this.currentUser = user.email;
    })
  }

  readDistricts(): AngularFireList<string> {
    return this.fireDB.list('districts');
  }

  readTypeOfWorks(): AngularFireList<string> {
    return this.fireDB.list('type_of_works');
  }

  readVendors(): AngularFireList<string> {
    return this.fireDB.list('vendors');
  }

  createNewSite(name: string) {
    const pushId = this.fireDB.createPushId();
    this.fireDB.list('sites').set(pushId, { id: pushId, user: this.currentUser, siteName: name });
    return this.fireDB.object('sites/' + pushId);
  }

  loadExistingSites() {
    return this.fireDB.list('sites', ref => ref.orderByChild('user').equalTo(this.currentUser));
  }

  getSiteReference(key: string) {
    return this.fireDB.object('sites/' + key);
  }

  saveSiteDetails(key: string) {
    return this.fireDB.object('sites/' + key);
  }

  getSiteDetails(key : string){
    return this.fireDB.object(`sites/${key}/siteDetails`);
  }

  getBeforeWorkPhotos(key: string) {
    return this.fireDB.list(`sites/${key}/beforeWork`);
  }

  getPPEPhotos(key: string) {
    return this.fireDB.list(`sites/${key}/ppe`);
  }

  getCompletePhotos(key: string) {
    return this.fireDB.list(`sites/${key}/complete`);
  }

}
