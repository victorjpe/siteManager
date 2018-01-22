import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the OtpPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp-popover',
  templateUrl: 'otp-popover.html',
})
export class OtpPopoverPage {

  constructor(private viewCtrl: ViewController) {}
  otp: any;

  confirm(){
    this.viewCtrl.dismiss(this.otp);
  }

}
