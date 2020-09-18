import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController,ViewController,NavParams,ToastController,Events, MenuController,ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { PwordPage } from '../pword/pword';
import { App } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  objectblock: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public http: HttpClient,private toastCtrl: ToastController, private alertCtrl: AlertController,private modalCtrl:ModalController,private menu: MenuController,public appCtrl: App,public events: Events,private ga: GoogleAnalytics) {
  this.ga.startTrackerWithId('UA-143211943-1')
   .then(() => {
     console.log('Google analytics is ready now');
      this.ga.trackView('signup');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
                   }

signup(objectblock) {
  if (this.objectblock.fname == "" || this.objectblock.fname == undefined) {
        
   this.showError('Please enter your first name');
   }
   else if (this.objectblock.mname == "" || this.objectblock.mname == undefined) {
        
   this.showError('Please enter your middle name');
   }
   else if (this.objectblock.lname == "" || this.objectblock.lname == undefined) {
        
   this.showError('Please enter your last name');
   }
   else if (this.objectblock.email == "" || this.objectblock.email == undefined) {
        
   this.showError('Please enter your email');
   }
   else if (this.objectblock.mobile == "" || this.objectblock.mobile == undefined) {
        
   this.showError('Please enter your mobile number');
   }
   else if (this.objectblock.dob == "" || this.objectblock.dob == undefined) {
        
   this.showError('Please enter your date of birth');
   }
   else if (this.objectblock.id_no == "" || this.objectblock.id_no == undefined) {
        
   this.showError('Please enter your national ID or passport number');
   }
   else if (this.objectblock.pin == "" || this.objectblock.pin == undefined) {
        
   this.showError('Please input a passowrd that you will use to login');
   }
   
   else{
  var myData = JSON.stringify({fname:this.objectblock.fname,mname:this.objectblock.mname,lname:this.objectblock.lname,mobile:this.objectblock.mobile,email:this.objectblock.email,dob:this.objectblock.dob,id_no:this.objectblock.id_no,pin:this.objectblock.pin,ref_code:this.objectblock.ref_code});
  this.http.post('http://35.193.234.253/signup.php',myData).subscribe((data5) => {
  
  if(data5[0].status=='1')
    {
    localStorage.setItem('fname', data5[0].fname);
    localStorage.setItem('mname', data5[0].mname);
    localStorage.setItem('lname', data5[0].lname);
    localStorage.setItem('email', data5[0].email);
    localStorage.setItem('mobile', data5[0].mobile);
    localStorage.setItem('userid', data5[0].userid);
    localStorage.setItem('interest', data5[0].interest);
    
this.events.publish('user:login',data5[0].fname,data5[0].mname,data5[0].lname,data5[0].userid);
    this.viewCtrl.dismiss();
    this.navCtrl.push('PwordPage');
    //this.appCtrl.getRootNav().setRoot(PwordPage);
    this.showToast('Welcome to Tufaa');
    }
    else{
    this.showError('The email or mobile you entered is already in use. Tap on forgot pin to reset incase you forgot your pin');
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
    console.log('ionViewDidLoad SignupPage');
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
   }
}
