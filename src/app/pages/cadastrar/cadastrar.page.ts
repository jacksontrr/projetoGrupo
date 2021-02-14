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
import { AngularFirestore } from '@angular/fire/firestore';

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
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    public alertController: AlertController // Importação do alerta
  ) {}

  ngOnInit() {}






  aparecercli() {
    if (document.getElementById('formcadastroprof').style.display == 'block'){
      document.getElementById('formcadastroprof').style.display = 'none';
      document.getElementById('botaoprof').style.display = 'none';
      document.getElementById('formcadastrocli').style.display = 'block';
      document.getElementById('botaocli').style.display = 'block';
    } else {
      document.getElementById('memediv').style.display = 'none';
      document.getElementById('memebotao').style.display = 'none';
      document.getElementById('formcadastrocli').style.display = 'block';
      document.getElementById('botaocli').style.display = 'block';
    }
  }
  aparecerprof() {
    if (document.getElementById('formcadastrocli').style.display == 'block'){
      document.getElementById('formcadastrocli').style.display = 'none';
      document.getElementById('botaocli').style.display = 'none';
      document.getElementById('formcadastroprof').style.display = 'block';
      document.getElementById('botaoprof').style.display = 'block';
    } else {
      document.getElementById('memediv').style.display = 'none';
      document.getElementById('memebotao').style.display = 'none';
      document.getElementById('formcadastroprof').style.display = 'block';
      document.getElementById('botaoprof').style.display = 'block';
    }
  }

  //se for none seleciona cliente ou profissão

  async registrarcli(usuariocli: Usuariocli) {
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
    } else if (this.formValidationcli() && divaparecercli && this.validarFormulariocli()) {
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
          })
          .catch();
        await this.firestore.collection("formularioCli").add(usuariocli);
        // redirecionar para a página home
        this.navCtrl.navigateRoot('home');
      } catch (e) {
        this.showToast(e);
      }
      loader.dismiss();
      console.log('Foi Criado com sucesso cli"'); // Aqui vai ser feito a parte do cadastrar o usuario
    }
  }

  async registrarprof(usuarioprof: Usuarioprof) {
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
    } else if (this.formValidationprof() && divaparecercli && this.validarFormularioprof()) {
      // mostrar loader
      let loader = await this.loadingCtrl.create({
        message: 'Por Favor espere...',
      });
      loader.present();
      try {
        // entrar com usuário e senha

        await this.afAuth
          .createUserWithEmailAndPassword(usuarioprof.email, usuarioprof.senha)
          .then((dados) => {
            console.log(dados);
          })
          .catch();
        await this.firestore.collection("formularioProf").add(usuarioprof);
        // redirecionar para a página home
        this.navCtrl.navigateRoot('home');
      } catch (e) {
        this.showToast(e);
      }
      loader.dismiss();
      console.log('Foi Criado com sucesso prof"'); // Aqui vai ser feito a parte do cadastrar o usuario
    }
  }


  validarFormularioprof() {
    if (!this.usuarioprf.nome) {
      this.showToast('Digite o nome');
      return false;
    }
    if (!this.usuarioprf.telefone) {
      this.showToast('Digite o telefone');
      return false;
    }
    if (!this.usuarioprf.endereco) {
      this.showToast('Digite o endereço');
      return false;
    }
    if (!this.usuarioprof.CPFCNPJ) {
      this.showToast('Digite o CPF');
      return false;
    }
    i
    return true;
  }


  //
  formValidationprof() {
    if (!this.usuarioprf.email) {
      !this.usuarioprf.email;
      //   mostrar toast message
      this.showToast('Digite seu e-mail');
      return false;
    }
    if (!this.usuarioprf.senha) {
      !this.usuarioprf.senha;
      //   mostrar toast message
      this.showToast('Digite sua Senha');
      return false;
    }
    return true;
  }

  validarFormulariocli() {
    if (!this.usuariocli.nome) {
      this.showToast('Digite o nome');
      return false;
    }
    if (!this.usuariocli.telefone) {
      this.showToast('Digite o telefone');
      return false;
    }
    if (!this.usuariocli.endereco) {
      this.showToast('Digite o endereço');
      return false;
    }
    if (!this.usuariocli.CPF) {
      this.showToast('Digite o CPF');
      return false;
    }
    return true;
  }


  //
  formValidationcli() {
    if (!this.usuariocli.email) {
      !this.usuariocli.email;
      //   mostrar toast message
      this.showToast('Digite seu e-mail');
      return false;
    }
    if (!this.usuariocli.senha) {
      !this.usuariocli.senha;
      //   mostrar toast message
      this.showToast('Digite sua Senha');
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
  showToast(mensagem: string) {
    this.toastCtrl
      .create({
        message: mensagem,
        duration: 900,
      })
      .then((toastData) => toastData.present());
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
