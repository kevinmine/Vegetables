import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, LoadingController, App,ModalController,ToastController } from 'ionic-angular';

/**
 * Generated class for the ConfirmModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-modal',
  templateUrl: 'confirm-modal.html',
})
export class ConfirmModalPage {
  template:string="<div></div>";
  body:any;
  data:any;
  title:any;
  completed:boolean=false;
  ticked:boolean=false;
  pageTo:string="Login";
  header:any;
  applyloan:boolean=false;

  constructor(public appCtrl: App, public navParams: NavParams, public viewCtrl: ViewController,public toastController: ToastController,private modalCtrl:ModalController) {
  this.body = navParams.get('body');
  this.title = navParams.get('title');
    this.template = navParams.get('template');
    this.completed = navParams.get('completed');
    this.pageTo = navParams.get('pageTo');
    this.applyloan= navParams.get('applyloan');
  }
  closeModal()
  {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmModalPage');
  }

}
