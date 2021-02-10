import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {




  constructor() {

   }

  ngOnInit() {

  }

   loginaparecer() {
    if (document.getElementById("logindiv").style.display == "block") {
        document.getElementById("logindiv").style.display = "none"
    } else {
        document.getElementById("logindiv").style.display = "block"
    }
  }
}

