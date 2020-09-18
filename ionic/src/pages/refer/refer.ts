import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController,ViewController,NavParams,ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the ReferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-refer',
  templateUrl: 'refer.html',
})
export class ReferPage {
  objectblock: any = {};
  fname:any;
  lname:any;
  text:any;
  userid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public http: HttpClient,private toastCtrl: ToastController, private alertCtrl: AlertController,private ga: GoogleAnalytics) {
  
 this.ga.startTrackerWithId('UA-143211943-1')
   .then(() => {
     console.log('Google analytics is ready now');
      this.ga.trackView('refer');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
  this.fname = localStorage.getItem('fname');
  this.lname = localStorage.getItem('lname');
  this.userid = localStorage.getItem('userid');
  
  }
  refer(objectblock) {
  var link = 'http://35.193.234.253/refer.php';
  var myData = JSON.stringify({name: this.objectblock.name,mobile: this.objectblock.mobile,fname: this.fname,lname: this.lname,userid: this.userid});
 
   if (this.objectblock.name == "" || this.objectblock.name == undefined) {
        
   this.showError('Please enter the name');
   }
   else if (this.objectblock.mobile == "" || this.objectblock.mobile == undefined) {
        
   this.showError('Please enter the mobile number');
   }
   
   else{
  
  
  this.http.post(link,myData).subscribe((data) => {
  var res=JSON.stringify(data);
 
 if(data[0].status=="1")
 {

this.showToast(this.objectblock.name+' sent the download link successfully..');
this.viewCtrl.dismiss();
 }
 else
 {
 this.showError('Could not add item, please try again');
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
    console.log('ionViewDidLoad ReferPage');
  }

}
