import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController,} from '@ionic/angular'; //Importação feita

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
