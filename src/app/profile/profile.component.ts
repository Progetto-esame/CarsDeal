import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  _accedi: any = (<HTMLInputElement>document.getElementById('navbarLogin'));

  ngOnInit() {
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
    }
  }
}
