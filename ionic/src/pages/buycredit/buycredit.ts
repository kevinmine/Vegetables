import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController,ViewController,NavParams,ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the BuycreditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buycredit',
  templateUrl: 'buycredit.html',
})
export class BuycreditPage {
  objectblock: any = {};
  firmid:any;
  userid:any;
  auth:any;
  mobile:any;
  interval:any;
  resp:any;desc:any;query:any;nini:any;disabled:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public http: HttpClient,private toastCtrl: ToastController, private alertCtrl: AlertController,private ga: GoogleAnalytics) {
  
 this.ga.startTrackerWithId('UA-143211943-1')
   .then(() => {
     console.log('Google analytics is ready now');
      this.ga.trackView('buy credit');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
  this.firmid = localStorage.getItem('firmid');
  this.userid = localStorage.getItem('userid');
  this.mobile = localStorage.getItem('mobile');
  this.disabled = false;
  }
  buy(objectblock) {
  var myData = JSON.stringify({amount: this.objectblock.amount,userid: this.userid,firmid: this.firmid});
 
   if (this.objectblock.amount == "" || this.objectblock.amount == undefined) {
        
   this.showError('Please enter amount');
   }
   
   else{
  this.disabled = true;
  this.showToast2('Loading Mpesa...');
  this.http.post('http://35.193.234.253/auth.php',myData).subscribe((data) => {
  this.auth=data['access_token'];
  var myData2 = JSON.stringify({amount: this.objectblock.amount,userid: this.userid,auth:this.auth,mobile:this.mobile});
  this.http.post('http://35.193.234.253/pesa.php',myData2).subscribe((data2) => {
  if(data2['ResponseCode']==0)
  {
  
  var req=data2['CheckoutRequestID'];
  var myData3 = JSON.stringify({CheckoutRequestID:req,auth:this.auth});
  this.http.post('http://35.193.234.253/querypesa.php',myData3).subscribe((data3) => {
  //var ResponseCode=data3['ResponseCode'];
  this.resp='';
 //alert(JSON.stringify(data4));
  this.query=setInterval(() => {
        this.http.post('http://35.193.234.253/querypesa.php',myData3).subscribe((data4) => {
  this.resp=data4['ResponseCode'];
  this.desc=data4['ResultDesc'];
  var properID =data4['requestId'];
  if (data4['ResponseCode']) { 
    clearInterval(this.query);
    if(data4['ResponseCode']==0)
    {
    this.disabled = false;
    if(data4['ResultDesc']=="[MpesaCB - ]The initiator information is invalid.")
    {this.showError('You entered an invalid Mpesa pin!');}
    else if(data4['ResultDesc']=="[STK_CB - ]Request cancelled by user")
    {this.showError('You have to enter the Mpesa pin to continue');}
    else if(data4['ResultDesc']=="[MpesaCB - ]The balance is insufficient for the transaction.")
    {this.showError('You have insufficient balance to complete this transaction');}
    else if(data4['ResultCode']==0)
    {
    this.http.post('http://35.193.234.253/repay.php',myData2).subscribe((data5) => {
    if(data5[0].status=='1')
    {
    this.viewCtrl.dismiss();
    this.showToast('Payment made successfully');
    }
    
    });
    }
    else{
    this.showError(data4['ResultDesc']);
       }
    }
    
  }
});

    }, 4000);
   



  
  
});
  }
  else
  {
  this.disabled = false;
  this.showError('Could not load Mpesa screen, please try again!');
  }
});
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
    console.log('ionViewDidLoad BuycreditPage');
  }

}
