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

    files: File[] = [];

    NgOninit(){
        if(localStorage.getItem('user') == null){
            alert('Redirect to Login');
        }

        this.files = [];
    }

    async uploadFile(e: Event) {
        const fileInput = e.target as HTMLInputElement;
    
        if (!fileInput.files || fileInput.files!.length === 0) {
            return;
        }

        for(const file of Array.from(fileInput.files!)) {
            this.files.push(file);
        }
    }

    FormSubmit(e: Event) {
        e.preventDefault();
        e.stopImmediatePropagation();

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
        const user = localStorage.getItem('user')!;


        const formData = new FormData();

        formData.append("auto", JSON.stringify(auto));
        formData.append('user', user);
        
        if(this.files) {
            for (const file of this.files) {
                formData.append(file.name, file);
            }
        }
        
        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
        })
        .then((response: Response) =>{
            if(!response.ok) {
                throw new Error();
            }

            return response.json();
        })
        .then(json => {
            console.log(json.message);
        })
        .catch(console.error);
    }
}
