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
    const dom = document.getElementsByTagName('body')[0];
    body.forEach((element: any) => {
      console.log(element.marca + " " + element.modello + " " + element.targa + " " + element.chilometri + " " + element.anno);
      let _div = document.createElement('div');
      _div.className = "cars";
      let cars = document.createElement('div');
      cars.innerHTML = `
      <div class="card">
      <img src="" class="card-img-top" alt="Placeholder Image">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <p class="card-text" id="txtMarca">Marca: ${element.marca}</p>
        <p class="card-text" id="txtModello">Modello: ${element.modello}</p>
        <p class="card-text" id="txtChilometri">Chilometri: </p>
        <p class="card-text" id="txtAnno">Anno: ${element.targa}</p>
        <a href="#" class="btn btn-primary">Specifiche</a>
      </div>
    </div>
      `;
      dom.appendChild(_div);
      _div.appendChild(cars);
    });
  }
}
