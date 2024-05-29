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
        <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="..." class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="..." class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="..." class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
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
