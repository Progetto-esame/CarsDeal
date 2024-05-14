import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  url = 'http://localhost:3000/';

  constructor(private router: Router) {
    this.router = router; // Assign the injected router parameter to the class property.
  }

  redirectRicerca(){
    this.router.navigate(['/ricerca']);
    console.log("Reindirizzamento a ricerca effettuato con successo");
  }

  ngOnInit() {
    let _carsDiv = document.getElementById('cars');
    fetch(`${this.url}getAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async(response: Response) => {
            console.log(await response.json());
            response.json().then((data) => {
              for(let i = 0; i < data.length; i++){
                
                let _car = document.createElement('div');
                console.log(data[i].marca
                );
              }
          })
          .catch((error: any) => {
            console.log(error);
        })
    });
  }
}
