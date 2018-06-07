import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

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

  constructor(
    formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private fireDB: AngularFireDatabase,
    private toastCtrl: ToastController,
    public navCtrl: NavController
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }
  loginForm: FormGroup;
  email: string;
  password: string;

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((confirmation) => {
        this.navCtrl.setRoot('HomePage');
        sessionStorage.setItem('user', this.email);
      })
      .catch(error => {
        let toast = this.toastCtrl.create({
          message: error.message,
          showCloseButton: true,
          position: 'middle',
          closeButtonText: 'OK'
        });
        toast.present();
      });
  }

  register() {
    this.navCtrl.push('UserRegisterPage');
  }

}
