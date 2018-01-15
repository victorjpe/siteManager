import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

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
    private afAuth: AngularFireAuth) {
  }

  phoneNumber: string;
  recaptchaVerifier;
  showPrompt: true;
  code: string;
  confirm;

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
        this.showPrompt = true;
        this.confirm = confirmation;
      });
    }
    catch (e) {
      console.error(e);
    }
  }

  confirmed() {
    this.confirm.confirm(this.code).then(()=> {
      console.log('success');
      this.navCtrl.push('HomePage');
    })
  }

}
