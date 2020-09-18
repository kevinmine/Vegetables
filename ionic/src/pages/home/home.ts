import {NavController, IonicPage} from 'ionic-angular';
import { Component } from '@angular/core';
import { AlertController, ToastController,ModalController,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

declare var SMS:any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loanlimit:any;
  fname:any;
  userid:any;
  loanbalance:any;
  loanduedate:any;
  interest:any;
  
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private toastCtrl: ToastController,private statusBar: StatusBar, public httpClient: HttpClient,private modalCtrl:ModalController,private ga: GoogleAnalytics,public platform:Platform) {
  this.ga.startTrackerWithId('UA-143211943-1')
   .then(() => {
     console.log('Google analytics is ready now');
      this.ga.trackView('home');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
   

  }

openPage(page) {
   
      this.navCtrl.push(page);
    
  }

  showError(error) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showToast(msj) {
    const toast = this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    toast.present();

  }
  }