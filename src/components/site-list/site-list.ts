import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the SiteListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'site-list',
  templateUrl: 'site-list.html'
})
export class SiteListComponent {

  constructor(private navCtrl: NavController) { }

  @Input() sites: any;

  loadSite(siteId: string) {
    this.navCtrl.push('SitePage', siteId);
  }

}
