import { Component } from '@angular/core';

@Component({
    selector: 'app-sell-cars',
    standalone: true,
    imports: [],
    templateUrl: './sell-cars.component.html',
    styleUrl: './sell-cars.component.css'
})
export class SellCarsComponent {
    now: number = new Date().getFullYear();

    NgOninit(){
        if(!localStorage.getItem('user')){
            alert('Redirect to Login');
        }
    }

    async uploadFile(e: Event) {
        const fileInput = e.target as HTMLInputElement;
        const _marca = (<HTMLInputElement>document.getElementById('marca')).value;
        const _modello = (<HTMLInputElement>document.getElementById('modello')).value;
        const _anno = (<HTMLInputElement>document.getElementById('txtAnno')).value;
        const _alimentazione = (<HTMLInputElement>document.getElementById('alimentazione')).value;
        const _emissioni = (<HTMLInputElement>document.getElementById('classeEmissioni')).value;
        const _potenza = (<HTMLInputElement>document.getElementById('txtPotenza')).value;
        const _chilometri = (<HTMLInputElement>document.getElementById('txtChilometri')).value;
        const _targa = (<HTMLInputElement>document.getElementById('txtTarga')).value;

        const auto = {
            marca: _marca,
            modello: _modello,
            anno: _anno,
            alimentazione: _alimentazione,
            emissioni: _emissioni,
            potenza: _potenza,
            chilometri: _chilometri,
            targa: _targa
        }

        if (fileInput.files!.length === 0)
            return;

        const formData = new FormData();

        formData.append("auto", JSON.stringify(auto));
        
        for (const file of Array.from(fileInput.files!)) {
            formData.append(file.name, file);
        }
        fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
            
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
