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

  ngOnInit() {
    localStorage.removeItem('user');
  }

  login() {
    const _email = (<HTMLInputElement>document.getElementById('txtEmail')).value;
    const _password = (<HTMLInputElement>document.getElementById('txtPassword')).value;
    let _message: any = (<HTMLInputElement>document.getElementById('message'));
    let _accedi: any = (<HTMLInputElement>document.getElementById('navbarLogin'));
    let _btnEsci: any = (<HTMLInputElement>document.getElementById('btnEsci'));
    let _lblUsername: any = (<HTMLInputElement>document.getElementById('lblUsername'));
    let _lblEmail: any = (<HTMLInputElement>document.getElementById('lblEmail'));
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
          
          _accedi.innerHTML = `
          <div class="btn-group dropstart">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Ciao, ${result.user.name}
            </button>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/login" id="btnEsci">Esci</a></li>
            <li><a class="dropdown-item" href="/profile" id="btnAutoPers">Le tue auto</a></li>
            </ul>
          </div>
          `;
          
          console.log(result.user);
          localStorage.setItem('user', JSON.stringify(result.user));
          this.router.navigate(['/home']);
        } else {
          _message.classList.add('badge', 'text-bg-warning', 'mt-2');
          console.log(result.message);
          _message.innerText = result.error;
        }
      })
      .catch((error: any) => {
        _message.innerText = result.error;
      });
  };
}
