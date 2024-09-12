import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  apiUrl = 'https://freeapi.miniprojectideas.com/api/User/Login';

  login:any = {
    "EmailId": "",
    "Password": ""
  }
  constructor(private http: HttpClient, private router: Router) {}
  onLogin() {

      this.http.post<any>(this.apiUrl, this.login).subscribe((response:any) => {
      console.log("Response from API:", response);

      if(response.result){
        localStorage.setItem("Login",this.login.EmailId)
        this.router.navigateByUrl("dashboard")
      }
      else{
        alert("Check User Name or Password")
      }
    });
    console.log("Submitted to:", this.apiUrl);
  }

}
