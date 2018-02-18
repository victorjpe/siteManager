import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private afAuth: AngularFireAuth, private popOverCtrl: PopoverController,
    private formBuilder: FormBuilder, public navCtrl: NavController) {
    this.loginForm = formBuilder.group({ phoneNumber: ['', Validators.required] });
  }
  loginForm: FormGroup;
  phoneNumber: string;
  recaptchaVerifier;

  ionViewDidLoad() {
    this.afAuth.auth.languageCode = 'en';
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible'
    });
  }

  login() {
    try {
      this.afAuth.auth.signInWithPhoneNumber(this.phoneNumber, this.recaptchaVerifier)
        .then((confirmation) => {
          const otpPopover = this.popOverCtrl.create('OtpPopoverPage');
          otpPopover.present();
          otpPopover.onDidDismiss(otp => {
            this.confirmed(otp, confirmation);
          })
        });
    }
    catch (e) {
      console.error(e);
    }
  }

  confirmed(code, confirmation) {
    confirmation.confirm(code).then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }

}
