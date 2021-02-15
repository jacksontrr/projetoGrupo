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
import { AngularFirestore } from '@angular/fire/firestore'; // importação feita

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  verificar: any;
  usuariocli = {} as Usuariocli;
  usuarioprof = {} as Usuarioprof;
  temporarioemail: string
  temporariosenha: string


  constructor(
    private loadingCtrl: LoadingController, // Importação do load
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    public alertController: AlertController // Importação do alerta
  ) {}

  ngOnInit() {}


  // Aparecer a div para pode cadastrar o CLIENTE

  aparecercli() {
    if (document.getElementById('formcadastroprof').style.display == 'block') {
      document.getElementById('formcadastroprof').style.display = 'none';
      document.getElementById('botaoprof').style.display = 'none';
      document.getElementById('formcadastrocli').style.display = 'block';
      document.getElementById('botaocli').style.display = 'block';

      this.usuariocli.email = this.usuarioprof.email
      this.usuariocli.senha = this.usuarioprof.senha
      this.usuariocli.nome = this.usuarioprof.nome
      this.usuariocli.endereco = this.usuarioprof.endereco
      this.usuariocli.telefone = this.usuarioprof.telefone

    } else {
      document.getElementById('memediv').style.display = 'none';
      document.getElementById('memebotao').style.display = 'none';
      document.getElementById('formcadastrocli').style.display = 'block';
      document.getElementById('botaocli').style.display = 'block';
      this.usuariocli.email = this.temporarioemail
      this.usuariocli.senha = this.temporariosenha
      this.temporarioemail = this.temporarioemail;
      this.temporariosenha = this.temporariosenha;    }
  }

  // Aparecer a div para pode cadastrar o PROFISSIONAL
  aparecerprof() {
    if (document.getElementById('formcadastrocli').style.display == 'block') {
      document.getElementById('formcadastrocli').style.display = 'none';
      document.getElementById('botaocli').style.display = 'none';
      document.getElementById('formcadastroprof').style.display = 'block';
      document.getElementById('botaoprof').style.display = 'block';
      this.usuarioprof.email = this.usuariocli.email
      this.usuarioprof.senha = this.usuariocli.senha
      this.usuarioprof.nome = this.usuariocli.nome
      this.usuarioprof.endereco = this.usuariocli.endereco
      this.usuarioprof.telefone = this.usuariocli.telefone

    } else {
      document.getElementById('memediv').style.display = 'none';
      document.getElementById('memebotao').style.display = 'none';
      document.getElementById('formcadastroprof').style.display = 'block';
      document.getElementById('botaoprof').style.display = 'block';
      this.usuarioprof.email = this.temporarioemail;
      this.usuarioprof.senha = this.temporariosenha;
      this.temporarioemail = this.temporarioemail;
      this.temporariosenha = this.temporariosenha;
    }
  }

  //############################################################################################
  // Cadastrar Cliente e formulario do CLIENTE

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
    } else if (
      this.formValidationcli() &&
      divaparecercli &&
      this.validarFormulariocli()
    ) {
      // mostrar loader
      let loader = await this.loadingCtrl.create({
        message: 'Por Favor espere...',
      });
      loader.present();
      try {
        // entrar com usuário e senha

        await this.afAuth
          .createUserWithEmailAndPassword(usuariocli.email, usuariocli.senha)//altenticação do CLIENTE
          .then((dados) => {
            console.log(dados);
          })
          .catch();
          await this.firestore.collection('formularioCli').add(usuariocli);//Vai se jogado dentro da coleção formularioProf

        // redirecionar para a página home
        this.navCtrl.navigateRoot('home');
      } catch (e) {
        this.showToast(e);
      }
      loader.dismiss();

    }
  }


    // Validação do formulario CLIENTE
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

  // Validação do CLIENTE
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

  //############################################################################################
  // Cadastrar profissional e formulario do PROFISSIONAL

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
    } else if (
      this.formValidationprof() &&
      divaparecerprof &&
      this.validarFormularioprof()
    ) {
      // mostrar loader
      let loader = await this.loadingCtrl.create({
        message: 'Por Favor espere...',
      });
      loader.present();
      try {
        // entrar com usuário e senha

        await this.afAuth
          .createUserWithEmailAndPassword(usuarioprof.email, usuarioprof.senha)//altenticação do PROFISSIONAL
          .then((dados) => {
            console.log(dados);
          })
          .catch();
          await this.firestore.collection('formularioProf').add(usuarioprof); //Vai se jogado dentro da coleção formularioProf
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
    if (!this.usuarioprof.nome) {
      this.showToast('Digite o nome');
      return false;
    }
    if (!this.usuarioprof.telefone) {
      this.showToast('Digite o telefone');
      return false;
    }
    if (!this.usuarioprof.endereco) {
      this.showToast('Digite o endereço');
      return false;
    }
    if (!this.usuarioprof.CPFCNPJ) {
      this.showToast('Digite o CPF ou CNPJ da empresa');
      return false;
    }
    if (!this.usuarioprof.empresa) {
      this.showToast('Digite o nome da empresa');
      return false;
    }
    return true;
  }

  formValidationprof() {
    if (!this.usuarioprof.email) {
      !this.usuarioprof.email;
      //   mostrar toast message
      this.showToast('Digite seu e-mail');
      return false;
    }
    if (!this.usuarioprof.senha) {
      !this.usuarioprof.senha;
      //   mostrar toast message
      this.showToast('Digite sua Senha');
      return false;
    }
    return true;
  }

  //#############################################################################################

  showToast(mensagem: string) {
    this.toastCtrl
      .create({
        message: mensagem, // Mensagem de erro
        duration: 2000,
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
} // fim do export class CadastrarPage implements OnInit
