import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  Platform,
  ToastController,
} from '@ionic/angular'; //Importação feita

import { Usuariocli, Usuarioprof } from '../../models/usuario.model'; // Importação feita
import { AngularFireAuth } from '@angular/fire/auth'; //Importação feita

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  verificar: any;
  usuariocli = {} as Usuariocli;
  usuarioprof = {} as Usuarioprof;

  constructor(
    private loadingCtrl: LoadingController, // Importação do load
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    public alertController: AlertController // Importação do alerta
  ) {}

  ngOnInit() {}

  aparecercadastro() {
    if (document.getElementById('formcadastrar').style.display == 'block') {
      document.getElementById('formcadastrar').style.display = 'none';
    } else {
      document.getElementById('formcadastrar').style.display = 'block';
    }
  }
  aparecercli() {
    if (document.getElementById('formcadastrocli').style.display == 'block') {
      document.getElementById('formcadastrocli').style.display = 'none';
      document.getElementById('formcadastroprof').style.display = 'block';
    } else {
      document.getElementById('formcadastroprof').style.display = 'block';
    }
  }
  aparecerprof() {
    if (document.getElementById('formcadastroprof').style.display == 'block') {
      document.getElementById('formcadastroprof').style.display = 'none';
      document.getElementById('formcadastrocli').style.display = 'block';
    } else {
      document.getElementById('formcadastrocli').style.display = 'block';
    }
  }

  //se for none seleciona cliente ou profissão

  async registrar(usuariocli: Usuariocli) {
    var divocultaprof =
      document.getElementById('formcadastroprof').style.display == 'none';
    var divaparecerprof =
      document.getElementById('formcadastroprof').style.display == 'block';

    var divocultacli =
      document.getElementById('formcadastrocli').style.display == 'none';
    var divaparecercli =
      document.getElementById('formcadastrocli').style.display == 'block';

    if (divocultacli == divaparecercli && divocultaprof == divaparecerprof) {
      let alert = await this.alertController.create({
        // Criação do alerta
        header: 'Atanção',
        message: 'Selecione uma das opções acima',
        buttons: ['Voltar'],
      });

      await alert.present();
    }else if (this.formValidation()) {
      // mostrar loader
      let loader = await this.loadingCtrl.create({
        message: 'Por Favor espere...',
      });
      loader.present();
      try {
        // entrar com usuário e senha
        await this.afAuth
          .createUserWithEmailAndPassword(usuariocli.email, usuariocli.senha)
          .then((dados) => {
            console.log(dados);
            // redirecionar para a página home
            this.navCtrl.navigateRoot('home');
          })
          .catch();
      } catch (e) {
        this.espera(e);
      }
      loader.dismiss();
      console.log('Foi para o else'); // Aqui vai ser feito a parte do cadastrar o usuario
    }
  }

  formValidation() {
    if (!this.usuariocli.email) {
      !this.usuariocli.email;
      //   mostrar toast message
      this.espera('Digite seu e-mail');
      return false;
    }
    if (!this.usuariocli.senha) {
      !this.usuariocli.senha;
      //   mostrar toast message
      this.espera('Digite sua Senha');
      return false;
    }
    return true;
  }

  async espera(mensagem: string) {
    //Tela de load
    let aguarde = await this.loadingCtrl.create({
      message: 'Aguarde por favor...',
      duration: 900,
    });
  }

  async outrapragina() {
    //Tela de load
    let aguarde = await this.loadingCtrl.create({
      message: 'Aguarde por favor...',
      duration: 900,
    });
    aguarde.present(); //Iniciar a tela de load.
    this.navCtrl.navigateRoot('login'); //Rota, a string inserido nas aspas será direcionado.
    aguarde.present(); //Encerrar a tela de load.
  }
}
