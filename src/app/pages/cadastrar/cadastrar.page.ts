import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController,} from '@ionic/angular'; //Importação feita

import { Usuariocli, Usuarioprof } from '../../models/usuario.model'


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  mudancaprof() {
    if (document.getElementById('#').style.display == 'block') {
      document.getElementById('#').style.display = 'none';
    } else {
      document.getElementById('#').style.display = 'block';
    }
  }


  formValidation() {
    if (!this.usuario.email) {// !this.usuario.email
      // mostrar toast message
      this.showToast("Digite seu e-mail");
      return false;
    }
    if (!this.usuario.senha) { // !this.usuario.senha
      // mostrar toast message
      this.showToast("Digite sua Senha");
      return false;
    }
    return true; 
  }

  async outrapragina() { //Tela de load
    let aguarde = await this.loadingCtrl.create({
      message: "Aguarde por favor...",
      duration: 900,
    });
    aguarde.present(); //Iniciar a tela de load.
    this.navCtrl.navigateRoot('login'); //Rota, a string inserido nas aspas será direcionado.
    aguarde.present();//Encerrar a tela de load.
    
  }
}
