import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular'; //Importação feita

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

  async outrapragina() { //Tela de load
    let aguarde = await this.loadingCtrl.create({
      message: 'Aguarde por favor...',
      duration: 900,
    });

    aguarde.present(); //Iniciar a tela de load.
    this.navCtrl.navigateRoot('cadastrar'); //Rota, a string inserido nas aspas será direcionado.
    aguarde.present(); //Encerrar a tela de load.
  }
}
