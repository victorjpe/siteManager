import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PpeDetailsPage } from './ppe-details';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PpeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PpeDetailsPage),
    ComponentsModule
  ],
})
export class PpeDetailsPageModule {}
