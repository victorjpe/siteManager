import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SiteServiceProvider } from '../../providers/site-service/site-service';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private siteService: SiteServiceProvider,
    formBuilder: FormBuilder) {
    this.siteDetailsForm = formBuilder.group({
      vendorName: ['', Validators.required],
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
  siteId: string;

  ionViewDidLoad() {
    this.siteService.readVendors().valueChanges()
      .subscribe(result => this.vendors = result);
    this.siteService.readTypeOfWorks().valueChanges()
      .subscribe(result => this.typeOfWorks = result);
    this.siteService.readDistricts().valueChanges()
      .subscribe(result => this.districts = result);
  }

  ionViewDidEnter(): void {
    this.siteId = this.navParams.data;
    this.siteService.getSiteDetails(this.siteId).valueChanges()
      .subscribe(siteDetails => this.info = siteDetails || {});
  }

  saveDetails() {
    this.siteService.getSiteReference(this.siteId)
      .update({ siteDetails: this.info }).then(() => this.navCtrl.pop());
  }

}
