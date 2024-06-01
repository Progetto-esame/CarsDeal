import { Component } from '@angular/core';

@Component({
    selector: 'app-sell-cars',
    standalone: true,
    imports: [],
    templateUrl: './sell-cars.component.html',
    styleUrl: './sell-cars.component.css'
})
export class SellCarsComponent {


    async uploadFile(e: Event) {
        const fileInput = e.target as HTMLInputElement;

        if (fileInput.files!.length === 0)
            return;

        const formData = new FormData();

        formData.append('targa', 'sonofrocio');

        for (const file of Array.from(fileInput.files!)) {
            formData.append(file.name, file);
        }

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
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
