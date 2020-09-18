import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController,ViewController,NavParams,ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the ApplyloanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-applyloan',
  templateUrl: 'applyloan.html',
})
export class ApplyloanPage {
  firmid:any;
  userid:any;
  loanlimit:any;
  objectblock: any = {};
  repay:any;
  interest:any;
  something:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public http: HttpClient,private toastCtrl: ToastController, private alertCtrl: AlertController,private ga: GoogleAnalytics) {
  
 this.ga.startTrackerWithId('UA-143211943-1')
   .then(() => {
     console.log('Google analytics is ready now');
      this.ga.trackView('request loan');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
  this.userid = localStorage.getItem('userid');
  this.loanlimit = navParams.get('loanlimit');
  this.interest = navParams.get('interest');
  this.repay=+this.loanlimit*(+this.interest+100)/100;
  this.something=false;
  
  }
getTotal(ev: any) {
    const val = ev.target.value;
    this.repay=+val*(+this.interest+100)/100;
 
}  
apply(objectblock) {
  this.something = 'disabled';
  let time = Date.now();
  let hash = Md5.hashStr(''+this.userid+time+'');
  var link = 'http://35.193.234.253/request_loan.php';
  var myData = JSON.stringify({amount: this.objectblock.amount,userid: this.userid,interest: this.interest,transid:hash});
if (this.objectblock.amount == "" || this.objectblock.amount == undefined) {
        
   this.showError('Amount cannot be empty');
   }
   else if (+this.objectblock.amount > +this.loanlimit) {
        
   this.showError('Amount entered exceeds your loan limit');
   }
   else{
  
  
  this.http.post(link,myData).subscribe((data) => {
  var res=JSON.stringify(data);
 
 if(data[0].status=="ok")
 {

this.showToast('Request sent successfully');
this.viewCtrl.dismiss();
 }
 else
 {
 this.showError('Could not send request, please try again');
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
    console.log('ionViewDidLoad ApplyloanPage');
  }

}
