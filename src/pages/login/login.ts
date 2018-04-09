import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
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

  constructor(private afAuth: AngularFireAuth,
    formBuilder: FormBuilder, public navCtrl: NavController) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
     });
  }
  loginForm: FormGroup;
  email: string;
  password: string;

  login() {
    try {
      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
        .then((confirmation) => {
          this.navCtrl.setRoot('HomePage');
        });
    }
    catch (e) {
      console.error(e);
    }
  }

  register(){
    this.navCtrl.push('UserRegisterPage');
  }
}
