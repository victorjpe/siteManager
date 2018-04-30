import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/take';

/*
  Generated class for the SiteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SiteServiceProvider {

  currentUser: string;

  constructor(public fireDB: AngularFireDatabase) {

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

  getSiteReference(key: string) {
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
