import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateSitePage } from './create-site';

@NgModule({
  declarations: [
    CreateSitePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateSitePage),
  ],
})
export class CreateSitePageModule {}
