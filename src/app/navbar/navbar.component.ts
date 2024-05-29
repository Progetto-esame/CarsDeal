import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  router: Router;
  constructor(router: Router) {
    this.router = router; // Assign the injected router parameter to the class property.
  }

  redirectLogin() {
  this.router.navigate(['/login']);
  console.log('redirectLogin');
  let _accedi: any = (<HTMLInputElement>document.getElementById('linkAccesso'));
  _accedi.innerText = "Accedi";
  localStorage.removeItem('user');
  }

  redirectHome() {
    this.router.navigate(['']);
    console.log('redirectHome');
  }

  redirectRicerca(){
    this.router.navigate(['/ricerca']);
    console.log("Reindirizzamento a ricerca effettuato con successo");
  }

  redirectReferenze(){
    this.router.navigate(['/referenze']);
    console.log("Reindirizzamento a referenze effettuato con successo");
  }
}




