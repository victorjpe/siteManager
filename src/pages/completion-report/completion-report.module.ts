import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompletionReportPage } from './completion-report';

@NgModule({
  declarations: [
    CompletionReportPage,
  ],
  imports: [
    IonicPageModule.forChild(CompletionReportPage),
  ],
})
export class CompletionReportPageModule {}
