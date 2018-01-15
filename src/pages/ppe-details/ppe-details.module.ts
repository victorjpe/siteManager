import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PpeDetailsPage } from './ppe-details';

@NgModule({
  declarations: [
    PpeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PpeDetailsPage),
  ],
})
export class PpeDetailsPageModule {}
