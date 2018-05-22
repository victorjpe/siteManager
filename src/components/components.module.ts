import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SiteListComponent } from './site-list/site-list';
import { PictureListComponent } from './picture-list/picture-list.component';
@NgModule({
  declarations: [
    SiteListComponent,
    PictureListComponent
],
  imports: [IonicModule],
  exports: [
    SiteListComponent,
    PictureListComponent
  ]
})
export class ComponentsModule { }
