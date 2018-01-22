import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geofence } from '@ionic-native/geofence';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ComponentsModule } from '../components/components.module';
import { SiteServiceProvider } from '../providers/site-service/site-service';

export const firebaseConfig = {
  apiKey: "AIzaSyDJO1mE0W6pXKVDZZldc5OTzCPr-Bi6nWo",
  authDomain: "site-manager-3e365.firebaseapp.com",
  databaseURL: "https://site-manager-3e365.firebaseio.com",
  projectId: "site-manager-3e365",
  storageBucket: "site-manager-3e365.appspot.com",
  messagingSenderId: "652661960440"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geofence,
    Geolocation,
    Camera,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SiteServiceProvider
  ]
})
export class AppModule {}
