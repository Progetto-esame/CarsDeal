import { Component } from '@angular/core';

@Component({
  selector: 'app-sell-cars',
  standalone: true,
  imports: [],
  templateUrl: './sell-cars.component.html',
  styleUrl: './sell-cars.component.css'
})
export class SellCarsComponent {


  uploadFile() {
    const fileInput = document.getElementById('fileInput');

    if(fileInput.files.length === 0) 
      return;

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

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



  document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('foo', fileInput.files[0]);

    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('File uploaded successfully!');
        } else {
            console.error('File upload failed!');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
}
