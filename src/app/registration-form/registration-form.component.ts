import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {
  url = 'http://localhost:3000/';

  constructor(private router: Router) { 
    this.router = router; // Assign the injected router parameter to the class property.
  }

  register(){
    const _email = (<HTMLInputElement>document.getElementById('txtEmail')).value;
    const _password = (<HTMLInputElement>document.getElementById('txtPassword')).value;
    const _name = (<HTMLInputElement>document.getElementById('txtName')).value;
    const _surname = (<HTMLInputElement>document.getElementById('txtSurname')).value;
    let _message: any = (<HTMLInputElement>document.getElementById('message')).value;
    console.log("Registrazione");
    fetch(`${this.url}register`, {
      method: 'POST',
      body: JSON.stringify({
        name: _name,
        surname: _surname,
        email: _email,
        password: _password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (response: Response) => {
        _message = await response.json();

        if(response.status == 200){
          console.log(_message.message);
        } else {
          console.log(_message.error);
        }
      })
      .catch(async (error: Response) => { // Errore di rete
        alert("Errore di rete");
        _message = await error.statusText;
      });
  }
} 
