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

  async ngOnInit() {

    const body = await(await fetch(`${this.url}getAll`)).json();
    const _div: any = document.getElementById('cars');
    body.forEach((element: any) => {
      console.log(element.marca + " " + element.modello + " " + element.targa + " " + element.chilometri + " " + element.anno);
      let cars = document.createElement('div');
      cars.className = 'wrapperCard';
      cars.style.margin = '10px';
      cars.style.width = '18rem';
      cars.innerHTML = `
      <div class="card bg-light">
        <img src="" class="card-img-top" alt="Placeholder Image">
        <div class="card-body">
          <h5 class="card-title"></h5>
          <p class="card-text" id="txtMarca">Marca: ${element.marca}</p>
          <p class="card-text" id="txtModello">Modello: ${element.modello}</p>
          <p class="card-text" id="txtChilometri">${element.chilometri} Km</p>
          <p class="card-text" id="txtAnno">Anno: ${element.anno}</p>
          <a href="#" class="btn btn-primary">Specifiche</a>
        </div>
      </div>
      `;
      _div.appendChild(cars);
    });
  }
}
