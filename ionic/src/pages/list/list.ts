import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, ToastController,ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { EditPage } from '../edit/edit';
import { CalculatePage } from '../calculate/calculate';
/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  items:any;
  constructor(public httpClient: HttpClient,public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController,private modalCtrl:ModalController,private ga: GoogleAnalytics)  {
  this.httpClient.get('https://www.minesoftwares.com/veg/vegetables.php').subscribe(data => {
this.items = data;
     
});
  }
delete(autoid,name) {
   var myData = JSON.stringify({name:name,autoid:autoid});
  this.httpClient.post('https://www.minesoftwares.com/veg/delete.php',myData).subscribe((data5) => {
  
  if(data5[0].status=='1')
    {
    this.httpClient.get('https://www.minesoftwares.com/veg/vegetables.php').subscribe(data => {
this.items = data;
     
});
    this.showToast(name+' Deleted');
    }
    
  }
  );
  }
  edit(name,price,autoid) {
this.navCtrl.push(EditPage,{name:name,price:price,autoid:autoid});
  }
  showToast(msj) {
    const toast = this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    toast.present();

  }
  calculate(name,price,autoid) {
this.navCtrl.push(CalculatePage,{name:name,price:price,autoid:autoid});
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
    console.log('ionViewDidLoad ListPage');
  }

}
