import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  loginaparecer() {
    if (document.getElementById('logindiv').style.display == 'block') {
      document.getElementById('logindiv').style.display = 'none';
    } else {
      document.getElementById('logindiv').style.display = 'block';
    }
  }

  async outrapragina() {
  

    let aguarde = await this.loadingCtrl.create({
      message: "Aguarde por favor...",
      duration: 900,
    });

    
    aguarde.present();
    this.navCtrl.navigateRoot('cadastrar');
    aguarde.present();
    
  }
}
