import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthService } from '@app/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentProfile = this.authService.currentUserValue;
        const isLoggedIn = currentProfile && currentProfile.token;
        const hostApiUrl = request.url.startsWith(environment.hostApiUrl);
        if (isLoggedIn && hostApiUrl) {
            //TODO add authorization header here before every request..
        }

        return next.handle(request);
    }
}