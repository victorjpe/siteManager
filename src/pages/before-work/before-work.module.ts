import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { BeforeWorkPage } from './before-work';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BeforeWorkPage,
  ],
  imports: [
    IonicPageModule.forChild(BeforeWorkPage),
    ComponentsModule
  ],
})
export class BeforeWorkPageModule {}
