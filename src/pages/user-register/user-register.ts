import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private afAuth: AngularFireAuth) {
      this.registerForm = formBuilder.group({ 
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required]
       });
  }

  register() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then((response) => console.log(response));
  }

}
