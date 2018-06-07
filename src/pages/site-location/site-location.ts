import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import L from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';

import { SiteServiceProvider } from '../../providers/site-service/site-service';
import { Location } from '../../providers/model/site';

/**
 * Generated class for the SiteLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-site-location',
  templateUrl: 'site-location.html',
})
export class SiteLocationPage {

  map: L.Map;
  siteId: string;
  markers: L.marker[] = [];

  constructor(
    private geolocation: Geolocation,
    private navParams: NavParams,
    private siteService: SiteServiceProvider
  ) { }

  ionViewWillEnter(): void {
    this.leafletMap();
  }

  ionViewDidEnter() {
    this.siteId = this.navParams.data;
    this.siteService.getSiteLocation(this.siteId).valueChanges().subscribe((location: Location) => {
      if (location) {
        this.map.panTo(new L.LatLng(location.latitude, location.longitude));
        this.addMarker(location);
      }
    });
    this.geolocation.getCurrentPosition().then((resp) => {
      this.addMarker({ message: '<p>You are here</p>', longitude: resp.coords.longitude, latitude: resp.coords.latitude });
    })
  }

  leafletMap() {
    this.map = L.map('siteLocation', {
      center: [28.644800, 77.216721],
      zoom: 13
    });
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet'
    }).addTo(this.map);
  }

  addMarker(location: Location) {
    var marker = new L.Marker([location.latitude, location.longitude]);
    this.map.addLayer(marker);
    marker.bindPopup(`<p>${location.message}</p>`);
    this.markers.push(marker);

    const group = L.featureGroup(this.markers);
    this.map.fitBounds(group.getBounds());
  }

}
