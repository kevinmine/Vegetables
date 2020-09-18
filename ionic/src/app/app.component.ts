import { Component, ViewChild } from '@angular/core';
//import {  App, Nav, Platform,LoadingController,ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {  App, Nav, Platform,IonicPage, NavController,LoadingController,ModalController,NavParams,Events,MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import { PwordPage } from '../pages/pword/pword';
//import { EditcompanyPage } from '../pages/editcompany/editcompany';
import * as firebase from 'firebase';

declare var FirebasePlugin: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  mobile:any;
  name:any;
  
  continue: boolean = false;
  data:any = {};
  body: any;
  
  fname:any;
  lname:any;
  credit:any;
  userid:any;
  
  constructor(public appCtrl: App,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public modalCtrl: ModalController,public loadingCtrl: LoadingController,public httpClient: HttpClient,public events: Events,public menuCtrl: MenuController) {
  this.name = localStorage.getItem('pin');
  this.fname = localStorage.getItem('fname');
  this.lname = localStorage.getItem('lname');
  this.userid = localStorage.getItem('userid'); 
 
  
  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    // used for an example of ngFor and navigation
    
    platform.ready().then(() => {
      this.initializeApp(statusBar, splashScreen);
   

    });
    
  }
  
  
  
  initializeApp(statusBar: StatusBar,
                splashScreen: SplashScreen) {
      
      this.nav.setRoot(HomePage);
    statusBar.styleDefault();
    splashScreen.hide();
  }
  buy() {
        let myModal = this.modalCtrl.create('BuycreditPage');
        myModal.present();
}
 refer() {
        let myModal = this.modalCtrl.create('ReferPage');
        myModal.present();
}
company(page2) {
        var link = 'https://www.cuteprofit.com/account/pos_admincheck.php';
  var myData = JSON.stringify({userid: this.userid});

  this.httpClient.post(link,myData).subscribe((data) => {
  var res=JSON.stringify(data);
  if(data[0].status=='user')
  {
  let template = "<div>You do not have rights to access company details</div>";
        let obj = {body: this.body, template: template, completed: true, pageTo: '', title: 'Oh Snap!'};
        let myModal = this.modalCtrl.create('ConfirmModalPage', obj);
        myModal.present();
  }
  else
  {
  this.appCtrl.getRootNav().push(page2);
  this.menuCtrl.close();
  }
},(error) => {
        alert(JSON.stringify(error));
      });
}

  
  
  openPage(page) {
  if(page=='HomePage')
  {this.nav.setRoot(HomePage);}
  else{
    this.appCtrl.getRootNav().push(page);
    }
  }
  logOut() {
    
        localStorage.clear();
        this.appCtrl.getRootNav().push(LoginPage);
    
  }
}

