import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { Role } from '../../shared/roles.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private tokenKey = 'auth_token';
  username: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next :(response:any) => {
      console.log(localStorage);
      localStorage.setItem(this.tokenKey, response.data);
      const role = this.authService.userRole;
      if(role===Role.ADMIN){
        this.router.navigate(['/products']);
      }
      else{
        this.router.navigate(['/products/preview']);
      }
    },
    error: error=> Notify.failure(error.message)
  });
  }
  enableLoginBtn(){
    if(this.username!='' && this.password != ''){
      return true;
    }
    return false;
  }
}
