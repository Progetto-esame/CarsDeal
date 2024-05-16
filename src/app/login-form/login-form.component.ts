import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  url : string = 'http://127.0.0.1:3000/';
  router: Router;
  
  constructor(router: Router, ) {
    this.router = router; // Assign the injected router parameter to the class property.
  }

  redirectRegistrazione() {
    this.router.navigate(['/registration']);
    console.log("Reindirizzamento a registrazione effettuato con successo");
  }

  login() {
    const _email = (<HTMLInputElement>document.getElementById('txtEmail')).value;
    const _password = (<HTMLInputElement>document.getElementById('txtPassword')).value;
    let _message: any = (<HTMLInputElement>document.getElementById('message'));
    let result : any;
    console.log("Login");
    fetch(`${this.url}login`, {
      method: 'POST',
      body: JSON.stringify({
        email: _email,
        password: _password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (response: any) => {
        result = await response.json();
        if(response.status == 200){
          _message.innerText = result.message;
        } else {
          _message.innerText = result.error;
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  };
}
