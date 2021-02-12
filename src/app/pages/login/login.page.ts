import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, Platform } from '@ionic/angular'; //Importação feita
import { Usuariocli, Usuarioprof } from '../../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  verificar: any;
  usuariocli = {} as Usuariocli;
  usuarioprof = {} as Usuarioprof;

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private platform: Platform
  ) {}

  ngOnInit() {}

  ionViewWillLeave() { // irá sair
    this.verificar.unsubscribe(); // Vai verificar desiscrever
  }

  ionViewDidEnter() { // se a view entrou
    this.verificar = this.platform.backButton.subscribe(() => { // Entrando vai para o app
      navigator["app"].exitApp();
    });
  }

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
