import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@app/auth/auth.service'
import { CCRoutes } from '@app/_utils/routes';

@Injectable({
  providedIn: 'root'
})
export class SignUpGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userEmail = this.authService.getUserEmail;

    //only display sign-up page if the user is comming from the Voucher route and has introduced a valid voucher
    if (userEmail) {
      return true;
    }

    this.router.navigate([CCRoutes.VOUCHER]);
    return false;
  }

}
