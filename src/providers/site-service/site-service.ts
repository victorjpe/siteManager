import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import {} from 'angularfire2';

/*
  Generated class for the SiteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SiteServiceProvider {

  constructor(public angularfirebaseDB: AngularFireDatabase) {
    console.log('Hello SiteServiceProvider Provider');
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

  saveSiteDetails(){
   return this.angularfirebaseDB.list('site-details');
  }

}
