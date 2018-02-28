import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { SiteServiceProvider } from '../../providers/site-service/site-service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private siteService: SiteServiceProvider, private formBuilder: FormBuilder) {
      this.siteDetailsForm = formBuilder.group({
        vendorName: ['', Validators.required],
        siteName: ['', Validators.required],
        siteId: ['', Validators.required],
        district: ['', Validators.required],
        typeOfWork: ['', Validators.required]
      });
  }
  districts: string[];
  vendors: string[];
  typeOfWorks: string[];
  info: any = {};
  siteDetailsForm: FormGroup;

  ionViewDidLoad() {
    this.siteService.readVendors().valueChanges()
      .subscribe(result => this.vendors = result);
    this.siteService.readTypeOfWorks().valueChanges()
      .subscribe(result => this.typeOfWorks =  result);
    this.siteService.readDistricts().valueChanges()
      .subscribe(result => this.districts = result);
  }

  saveDetails(){
    this.siteService.saveSiteDetails().set(this.info);
  }

}
