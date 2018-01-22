import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth, private popOverCtrl: PopoverController  ) {
  }

  phoneNumber: string;
  recaptchaVerifier;

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

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
    confirmation.confirm(code).then(()=> {
      console.log('success');
      this.navCtrl.setRoot('HomePage');
    })
  }

}
