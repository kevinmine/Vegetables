import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController,ViewController,NavParams,ToastController,Events, MenuController,ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { PwordPage } from '../pword/pword';
import { App } from 'ionic-angular';



/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

objectblock: any = {};
  name:any;
  price:any;
  cost:any;
  autoid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public http: HttpClient,private toastCtrl: ToastController, private alertCtrl: AlertController,private modalCtrl:ModalController,private menu: MenuController,public appCtrl: App,public events: Events,private ga: GoogleAnalytics) {
  this.name = navParams.get('name');
  this.price = navParams.get('price');
  this.autoid = navParams.get('autoid');
  }

signup(objectblock) {
  if (this.name == "" || this.name == undefined) {
        
   this.showError('Please enter the vegetable name');
   }
   else if (this.price == "" || this.price == undefined) {
        
   this.showError('Please enter the vegetable price');
   }
   
   else{
  var myData = JSON.stringify({name:this.name,autoid:this.autoid,price:this.price});
  this.http.post('https://www.minesoftwares.com/veg/edit.php',myData).subscribe((data5) => {
  
  if(data5[0].status=='1')
    {
    this.viewCtrl.dismiss();
    this.navCtrl.push('ListPage');
    //this.appCtrl.getRootNav().setRoot(PwordPage);
    this.showToast('Vegetable Updated');
    }
  
});
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

}
