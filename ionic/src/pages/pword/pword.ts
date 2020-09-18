import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController,LoadingController,ToastController, MenuController,Events} from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the PwordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pword',
  templateUrl: 'pword.html',
})
export class PwordPage {
pin:string= "";
spin:string= "";
fname:any;
mobile:any;
email:any;
firm:any;
body:any;
mobile2:any;

@Output() change: EventEmitter<string> = new EventEmitter<string>();

constructor(public navCtrl: NavController,private modalCtrl:ModalController,private toastCtrl: ToastController,private statusBar: StatusBar,private menu: MenuController,public http: HttpClient,private ga: GoogleAnalytics,public events: Events) {
  
 this.ga.startTrackerWithId('UA-143211943-1')
   .then(() => {
     console.log('Google analytics is ready now');
      this.ga.trackView('pin');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e)); 
this.statusBar.hide();

this.spin = localStorage.getItem('pin');
this.fname = localStorage.getItem('fname');
this.mobile = localStorage.getItem('mobile');
this.firm = localStorage.getItem('firm');
this.mobile2=localStorage.getItem('mobile').substring(7);

this.statusBar.hide();
  }
Pin: String ="";
  ShowPin: Boolean = false;
  
  eventCapture(event) {
    this.ShowPin = false;
    this.Pin=event;
  }

  showPin() {
    this.ShowPin = !this.ShowPin;
  }
  emitEvent() {
    this.change.emit(this.pin);
  }
  handleInput(pin: string) {
    if (pin === "clear") {
      this.pin = "";
      return;
    }
    this.pin += pin;
    if (this.pin.length === 4) {
       
        var link = 'http://35.193.234.253/login.php';
        var myData = JSON.stringify({mobile: this.mobile,password: this.pin});
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
 
this.events.publish('user:login',  data[0].fname,data[0].mname,data[0].lname,data[0].userid);
this.showToast('Welcome '+data[0].fname+'...');
this.navCtrl.push(HomePage);
 }
 else
 {
 let template = "<div>You entered a wrong pin</div>";
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
   
      this.navCtrl.push('LoginPage');
    
  }
  reset() {
        let myModal = this.modalCtrl.create('ResetPage');
        myModal.present();
  }
  showToast(msj) {
    const toast = this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    toast.present();

  }
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad PwordPage');
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
