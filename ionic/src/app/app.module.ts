import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { HomePageModule } from '../pages/home/home.module';
import { ConfirmModalPage } from '../pages/confirm-modal/confirm-modal';
import { PwordPageModule } from '../pages/pword/pword.module';
import { PwordPage } from '../pages/pword/pword';
import { EditPageModule } from '../pages/edit/edit.module';
import { EditPage } from '../pages/edit/edit';
import { CalculatePageModule } from '../pages/calculate/calculate.module';
import { CalculatePage } from '../pages/calculate/calculate';

import { GoogleAnalytics } from '@ionic-native/google-analytics';



@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
   BrowserModule,
   HttpClientModule,
   LoginPageModule,
   HomePageModule,
   PwordPageModule,
   EditPageModule,
   CalculatePageModule,
   IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    EditPage,
    CalculatePage,
    PwordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    DatePipe,
    GoogleAnalytics,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
