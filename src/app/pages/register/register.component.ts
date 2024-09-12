import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    firstName: '',
    middleName:'',
    lastName:'',
    mobileNo: '',
    emailId: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.user.firstName && this.user.middleName && this.user.lastName && this.user.mobileNo && this.user.emailId && this.user.password) {
      this.http.post('https://freeapi.miniprojectideas.com/api/User/CreateNewUser', this.user).subscribe(
        response => {
          console.log('Registration successful', response);
          alert('Registration successful!');
        },
        error => {
          console.error('Registration failed', error);
          alert('Registration failed. Please try again!');
        }
      );
    }
  }

}
