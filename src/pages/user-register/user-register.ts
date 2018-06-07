import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from '../../providers/model/user';

/**
 * Generated class for the UserRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
})
export class UserRegisterPage {

  registerForm: FormGroup;
  email: string;
  password: string;
  constructor(
    formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private fireDB: AngularFireDatabase,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  register() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((resp) => {
        this.updateUsers(resp);
        this.navCtrl.popToRoot();
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

  updateUsers(authData: any): void {
    const loggedUser = new User(authData);
    this.fireDB.list('users').push(loggedUser);
  }

}
