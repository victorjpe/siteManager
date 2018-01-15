import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SiteDetailsPage } from './site-details';

@NgModule({
  declarations: [
    SiteDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SiteDetailsPage),
  ],
})
export class SiteDetailsPageModule {}
