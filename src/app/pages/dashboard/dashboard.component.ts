import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,ListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  name: string = '';
  color: string = '';
  capacity: string = '';
  price?: number;
  screenSize?: number;
  products: any[] = [];
  ids: string[] = []; 
  apiUrl = 'https://api.restful-api.dev/objects';
  router: any;

  constructor(private http: HttpClient) {}

  onSubmit() {
    const newProduct = {
      name: this.name,
      data: {
        color: this.color,
        capacity: this.capacity,
        price: this.price,
        screenSize: this.screenSize
      }
    };

    this.http.post<any>(this.apiUrl, newProduct).subscribe(response => {
      console.log("Response from API:", response);

      // Fetch the newly created product by ID
      this.fetchProductById(response.id);
      // Retrieve existing IDs from local storage
      if (typeof window !== 'undefined' && window.localStorage) {
    const storedIds = localStorage.getItem('Id');
    const ids = storedIds ? JSON.parse(storedIds) : [];
    
    // Add the new ID to the list
    ids.push(response.id);
    
    // Save updated list of IDs to local storage
    localStorage.setItem('Id', JSON.stringify(ids));
      }

      // Clear the form
      this.name = '';
      this.color = '';
      this.capacity = '';
      this.price = undefined;
      this.screenSize = undefined;
    });

    console.log("Submitted to:", this.apiUrl);
  }

  fetchProductById(id: string) {
    this.http.get<any>(`${this.apiUrl}/${id}`).subscribe(response => {
      console.log("Fetched product by ID:", response);

      // Update the products list with the fetched product
      const existingIndex = this.products.findIndex(product => product.id === id);
      if (existingIndex !== -1) {
        // Update the existing product if already in the list
        this.products[existingIndex] = response;
      } else {
        // Add the newly fetched product to the list
        this.products.push(response);
      }
    
    });
  }
}
