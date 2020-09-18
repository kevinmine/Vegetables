import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController,ViewController,NavParams,ToastController,Events, MenuController,ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { PwordPage } from '../pword/pword';
import { App } from 'ionic-angular';

/**
 * Generated class for the CalculatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calculate',
  templateUrl: 'calculate.html',
})
export class CalculatePage {

  name:any;
  price:any;
  cost:any;
  autoid:any;
  qty:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public http: HttpClient,private toastCtrl: ToastController, private alertCtrl: AlertController,private modalCtrl:ModalController,private menu: MenuController,public appCtrl: App,public events: Events,private ga: GoogleAnalytics) {
  this.name = navParams.get('name');
  this.price = navParams.get('price');
  this.autoid = navParams.get('autoid');
  }

signup(objectblock) {
  if (this.qty == "" || this.qty == undefined) {
        
   this.showError('Please enter the quantity');
   }
   
   else{
 this.showError2('The Total cost of '+this.qty+' item(s) is '+this.qty*this.price);
  
}
 }

  


showToast(msj) {
    const toast = this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    toast.present();

  }
showError(error) {
    let alert = this.alertCtrl.create({
      title: 'Ooops!',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  showError2(error) {
    let alert = this.alertCtrl.create({
      title: 'Great!',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculatePage');
  }

}
