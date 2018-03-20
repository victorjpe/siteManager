import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SiteListComponent } from './site-list/site-list';
@NgModule({
  declarations: [
    SiteListComponent
  ],
  imports: [IonicModule],
  exports: [
    SiteListComponent
  ]
})
export class ComponentsModule { }
