import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, ToastController,ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the StatementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statement',
  templateUrl: 'statement.html',
})
export class StatementPage {
  items:any;
  userid:any;
  constructor(public httpClient: HttpClient,public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController,private modalCtrl:ModalController,private ga: GoogleAnalytics) {
  
 this.ga.startTrackerWithId('UA-143211943-1')
   .then(() => {
     console.log('Google analytics is ready now');
      this.ga.trackView('inventory');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
  this.userid = localStorage.getItem('userid');
  this.httpClient.get('http://35.193.234.253/loan_history.php?userid='+this.userid).subscribe(data => {
this.items = data;
     
});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatementPage');
  }

}
