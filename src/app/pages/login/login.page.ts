import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, Platform, ToastController} from '@ionic/angular'; //Importação feita
import { Usuariocli, Usuarioprof } from '../../models/usuariocli.model';



import { AngularFireAuth } from "@angular/fire/auth";

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
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
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
// Não é para mexer
  loginaparecer() {
    if (document.getElementById('logindiv').style.display == 'block') {
      document.getElementById('logindiv').style.display = 'none';
    } else {
      document.getElementById('logindiv').style.display = 'block';
    }
  }



  async login(usuariocli: Usuariocli) {
    if (this.formValidationcli()) {
      let loader = await this.loadingCtrl.create({
        message: "Por Favor Espere...",
      });
      loader.present();
      try {
        // login user with email e senha
        await this.afAuth
          .signInWithEmailAndPassword(usuariocli.email, usuariocli.senha)
          .then((data) => {


            console.log(data);
            //redirecionar para home page
            this.navCtrl.navigateRoot("home");
          })
          .catch();
      } catch (e) {
        this.showToast(e);
      }
      loader.dismiss();
    }
  }

  formValidationcli() {
    if (!this.usuariocli.email) {
      // mostrar toast message
      this.showToast("Digite seu e-mail");
      return false;
    }
    if (!this.usuariocli.senha) {
      // mostrar toast message
      this.showToast("Digite sua Senha");
      return false;
    }
    return true;
  }


//##########################################################################################################
//Tela de espera e mensagem de erro

  showToast(mensagem: string) {
    this.toastCtrl
      .create({
        message: mensagem,
        duration: 3000,
      })
      .then((toastData) => toastData.present());
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
