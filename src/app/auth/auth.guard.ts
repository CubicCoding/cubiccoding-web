import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '@app/auth/auth.service';
import { CCRoutes } from '@app/_utils/routes';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserValue;

        if (currentUser) {
            return true;
        }

        // not logged in so redirect to sign-in page with the return url
        this.router.navigate([CCRoutes.SIGN_IN], { queryParams: { returnUrl: state.url } });
        return false;
    }
}