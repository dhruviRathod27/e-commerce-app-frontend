import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Role } from '../shared/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const expectedRole = next.data['expectedRole'];
      const userRole = this.authService.userRole;
    if (this.authService.isAuthenticated()) {
      if(expectedRole === Role.ADMIN){
        return expectedRole==userRole? true: false;
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
