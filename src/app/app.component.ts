import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../pages/login/login';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit, OnDestroy {

  rootPage: any = LoginPage;
  authSubject: Subject<boolean>;


  constructor(
    platform: Platform,
    private afAuth: AngularFireAuth,
    splashScreen: SplashScreen,
    statusBar: StatusBar
  ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(): void {
    this.authSubject =  new Subject();
    this.afAuth.authState.takeUntil(this.authSubject).subscribe(user => {
      sessionStorage.setItem('user', user.email);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    sessionStorage.removeItem('user');
  }

  ngOnDestroy(): void {
    this.authSubject.next();
    this.authSubject.complete();
  }
}

