import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  instagram:any;
  facebook:any;
  email:any;
  whatsapp:any;
  mobile:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,private ga: GoogleAnalytics) {
  this.ga.startTrackerWithId('UA-143211943-1')
   .then(() => {
     console.log('Google analytics is ready now');
      this.ga.trackView('help');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
   
   var link = 'http://35.193.234.253/terms.php';
  
  this.http.post(link,{}).subscribe((data) => {
  var res=JSON.stringify(data);
  this.instagram=data[0].instagram;
  this.email=data[0].email;
  
},(error) => {
        alert(JSON.stringify(error));
      });
  }
openPage(page) {
  if(page=='HomePage')
  {this.navCtrl.push(page);}
  else if(page=='Instagram')
  {
   window.open(this.instagram, '_system');
  }
  else if(page=='Facebook')
  {
  window.open(this.facebook, '_system', 'location=no');
  }
  else if(page=='WhatsApp')
  {
  window.open(this.whatsapp, '_system', 'location=no');
  }
  else if(page=='Call')
  {
  window.open(this.mobile, '_system');
  }
  
  else{
  window.open(this.email, '_system');
    
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

}
