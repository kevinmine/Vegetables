import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ModalController,ToastController, MenuController,Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  objectblock: any = {};
  data:any = {};
  body:any;
  kevin:any;
  response= [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,public loadingCtrl: LoadingController,private modalCtrl:ModalController,private toastCtrl: ToastController,private statusBar: StatusBar,private menu: MenuController,private ga: GoogleAnalytics,public events: Events) {
  
 this.ga.startTrackerWithId('UA-143211943-1')
   .then(() => {
     console.log('Google analytics is ready now');
      this.ga.trackView('login');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e)); 
this.statusBar.hide();

  }
async login(objectblock) {
  var link = 'http://35.193.234.253/login.php';
  var myData = JSON.stringify({mobile: this.objectblock.mobile,password: this.objectblock.password});
 
   if (this.objectblock.mobile == "" || this.objectblock.mobile == undefined) {
        
   let template = "<div>Kindly enter your email address or mobile number</div>";
        let obj = {body: this.body, template: template, completed: true, pageTo: '', title: 'Oh Snap!'};
        let myModal = this.modalCtrl.create('ConfirmModalPage', obj);
        myModal.present();
   }
   else if (this.objectblock.password == "" || this.objectblock.password == undefined) {
        
   let template = "<div>Kindly enter your password</div>";
        let obj = {body: this.body, template: template, completed: true, pageTo: '', title: 'Oh Snap!'};
        let myModal = this.modalCtrl.create('ConfirmModalPage', obj);
        myModal.present();
   }
   else{
  
  
  this.http.post(link,myData).subscribe((data) => {
  var res=JSON.stringify(data);
 
 if(data[0].status=="ok")
 {
localStorage.setItem('fname', data[0].fname);
localStorage.setItem('lname', data[0].lname);
localStorage.setItem('email', data[0].email);
localStorage.setItem('mobile', data[0].mobile);
localStorage.setItem('userid', data[0].userid);
localStorage.setItem('mname', data[0].mname);
localStorage.setItem('interest', data[0].interest);
 
this.events.publish('user:login',  data[0].fname,data[0].mname,data[0].lname,data[0].userid);
this.showToast('Welcome '+data[0].fname+'...');
this.navCtrl.push(HomePage);
 }
 else
 {
 let template = "<div>Wrong Email/Mobile or password</div>";
        let obj = {body: this.body, template: template, completed: true, pageTo: '', title: 'Oh Snap!'};
        let myModal = this.modalCtrl.create('ConfirmModalPage', obj);
        myModal.present();
 
 }
},(error) => {
        alert(JSON.stringify(error));
      });

 }
  

}

openPage(page) {
   
      this.navCtrl.push(page);
    
  }
  
  showToast(msj) {
    const toast = this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    toast.present();

  }
  reset() {
        let myModal = this.modalCtrl.create('ResetPage');
        myModal.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
