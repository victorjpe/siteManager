import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtpPopoverPage } from './otp-popover';

@NgModule({
  declarations: [
    OtpPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(OtpPopoverPage),
  ],
})
export class OtpPopoverPageModule {}
