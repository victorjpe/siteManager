import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

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

  constructor(private viewCtrl: ViewController, private formBuilder: FormBuilder) {
    this.otpForm = formBuilder.group({ otp: ['', Validators.required] });
  }
  otp: any;
  otpForm: FormGroup;

  confirm() {
    this.viewCtrl.dismiss(this.otp);
  }

}
