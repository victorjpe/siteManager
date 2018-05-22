import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CompletionReportPage } from './completion-report';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CompletionReportPage,
  ],
  imports: [
    IonicPageModule.forChild(CompletionReportPage),
    ComponentsModule
  ],
})
export class CompletionReportPageModule {}
