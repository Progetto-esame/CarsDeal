import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  url : string = 'http://127.0.0.1:3000/';
  router: Router;

  constructor(router: Router, ) {
    this.router = router; // Assign the injected router parameter to the class property.
  }
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  _accedi: any = (<HTMLInputElement>document.getElementById('navbarLogin'));

  ngOnInit() {
    if(localStorage.getItem('user') == null){
      this.router.navigate(['']);
    }else{
      console.log(this.user);
      this._accedi.innerHTML = `
          <div class="btn-group dropstart">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Ciao, ${this.user.name}
            </button>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/login" id="btnEsci">Esci</a></li>
            <li><a class="dropdown-item" href="/profile" id="btnAutoPers">Le tue auto</a></li>
            </ul>
          </div>
          `;
    }
  } 
  openModal(){
    let modal: any = document.getElementById('passwordModal');
    modal.style.display = "block";
  }

  closeModal(){
    let modal: any = document.getElementById('passwordModal');
    let _message = (<HTMLInputElement>document.getElementById('warningMessage'));
    modal.style.display = "none";
    _message.innerHTML = '';
  }

  renewPwd(){
    let _oldPwd = (<HTMLInputElement>document.getElementById('currentPwd')).value;
    let _newPwd = (<HTMLInputElement>document.getElementById('newPwd')).value;
    let _confirmPwd = (<HTMLInputElement>document.getElementById('confirmPwd')).value;
    let _message = (<HTMLInputElement>document.getElementById('warningMessage'));

    let user: any = JSON.parse(localStorage.getItem('user') || '{}');

    if(_oldPwd == '' || _newPwd == '' || _confirmPwd == ''){
      _message.innerHTML = 'Compilare tutti i campi';
      return;
    }
    else if(_newPwd != _confirmPwd){
      _message.innerHTML = 'Le password non corrispondono';
      return;
    }else if (_newPwd == _oldPwd){
      _message.innerHTML = 'La nuova password non può essere uguale a quella attuale';
      return;
    }else{
      console.log(user.email);
      fetch(`${this.url}renewPwd`, {
        method: 'POST',
        body: JSON.stringify({
          pwdUser: user.password,
          email: user.email,
          oldPwd: _oldPwd,
          newPwd: _newPwd 
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response: any) => {
        if(response.status == 200){
          _message.innerText = response.message;
          this.router.navigate(['/login']);
        }else{
          _message.innerText = response.error;
        }
      }).catch((response: any) => {
        _message.innerText = response.error;
      });
    }
  }
}
