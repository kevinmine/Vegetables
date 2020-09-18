import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController,ViewController,NavParams,ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

  objectblock: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public http: HttpClient,private toastCtrl: ToastController, private alertCtrl: AlertController,private ga: GoogleAnalytics) {
  
 this.ga.startTrackerWithId('UA-143211943-1')
   .then(() => {
     console.log('Google analytics is ready now');
      this.ga.trackView('password reset');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
  }
  reset(objectblock) {
  var link = 'http://35.193.234.253/reset.php';
  var myData = JSON.stringify({mobile: this.objectblock.mobile,email: this.objectblock.email});
 
   if (this.objectblock.mobile == "" || this.objectblock.mobile == undefined) {
        
   this.showError('Please enter your mobile');
   }
   else if (this.objectblock.email == "" || this.objectblock.email == undefined) {
        
   this.showError('Please enter your email');
   }
   
   else{
  
  
  this.http.post(link,myData).subscribe((data) => {
  var res=JSON.stringify(data);
 
 if(data[0].status=="ok")
 {
 this.viewCtrl.dismiss();
this.showToast2('We have texted you your pin...');
 }
 else
 {
 this.showError('The credentials you entered are not registered with us');
 }
},(error) => {
        alert(JSON.stringify(error));
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
  showToast2(msj) {
    const toast = this.toastCtrl.create({
      message: msj,
      duration: 8000
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
  
closeModal()
  {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }

}
