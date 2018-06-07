import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SiteLocationPage } from './site-location';

@NgModule({
  declarations: [
    SiteLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(SiteLocationPage),
  ],
})
export class SiteLocationPageModule {}
