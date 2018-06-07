import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { SiteServiceProvider } from '../../providers/site-service/site-service';
import { Site, Location } from '../../providers/model/site';
import { User } from '../../providers/model/user';

/**
 * Generated class for the CreateSitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-site',
  templateUrl: 'create-site.html',
})
export class CreateSitePage {

  createSiteForm: FormGroup;
  districts: string[];
  vendors: string[];
  info: Site = { createdUser: sessionStorage.getItem('user')};
  typeOfWorks: string[];
  workers: Observable<User[]>;
  saveLocation: boolean;

  constructor(
    formBuilder: FormBuilder,
    private siteService: SiteServiceProvider,
    private viewCtrl: ViewController
  ) {
    this.createSiteForm = formBuilder.group({
      siteName: ['', Validators.required],
      vendorName: ['', Validators.required],
      siteId: ['', Validators.required],
      district: ['', Validators.required],
      typeOfWork: ['', Validators.required],
      latitude: [''],
      longitude: [''],
      assignee: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    this.siteService.readVendors().valueChanges()
      .subscribe(result => this.vendors = result);
    this.siteService.readTypeOfWorks().valueChanges()
      .subscribe(result => this.typeOfWorks = result);
    this.siteService.readDistricts().valueChanges()
      .subscribe(result => this.districts = result);
    this.workers = this.siteService.readWorkers().valueChanges();
  }

  createSite(): void {
    this.siteService.createNewSite(this.info);
    this.viewCtrl.dismiss();
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  initLocation(): void {
    if (this.saveLocation) {
      this.info.location = new Location(this.info.siteName);
    } else {
      this.info.location = undefined;
    }
  }

}
