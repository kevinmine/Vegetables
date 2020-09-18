import {NavController, IonicPage} from 'ionic-angular';
import { Component } from '@angular/core';
import { AlertController, ToastController,ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {
  terms:any;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private toastCtrl: ToastController,private statusBar: StatusBar, public httpClient: HttpClient,private modalCtrl:ModalController,private ga: GoogleAnalytics) {
  this.ga.startTrackerWithId('UA-143211943-1')
   .then(() => {
     console.log('Google analytics is ready now');
      this.ga.trackView('terms');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));

  this.httpClient.get('http://35.193.234.253/terms.php').subscribe((data) => {
  var res=JSON.stringify(data);
  this.terms=data[0].terms;
},(error) => {
        alert(JSON.stringify(error));
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
  }

}
