import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '@environments/environment';

import { User } from '@app/auth/models/user';
import { Voucher } from '@app/auth/models/voucher';
import { UserProfile } from '@app/shared/user-profile';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Constants } from '@app/_utils/constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserProfile>;
  public userProfile: Observable<UserProfile>;
  private userEmail: string;

  constructor(private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserProfile>(JSON.parse(localStorage.getItem(Constants.CURRENT_USER)));
    this.userProfile = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserProfile {
    return this.currentUserSubject.value;
  }

  public get getUserEmail(): string {
    return this.userEmail;
  }

  getVoucher(voucherUuid: string) {
    return this.http.get<Voucher>(`${environment.hostApiUrl}/api/vouchers/${voucherUuid}`)
      .pipe(map(response => {
        this.userEmail = response.email;
        return response;
      }));
  }

  signup(user: User) {
    return this.http.post(`${environment.hostApiUrl}/api/students/signup`, user);
  }

  signin(username: string, password: string) {
    let credentials = {
      username: username,
      password: password
    };

    return this.http.post<UserProfile>(`${environment.hostApiUrl}/login?requires_profile=true`, JSON.stringify(credentials), { observe: 'response' })
      .pipe(map(response => {
        let userProfile = response.body;
        userProfile.token = response.headers.get(Constants.AUTHORIZATION);
        localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(userProfile));
        this.currentUserSubject.next(userProfile);
        return userProfile;
      }));
  }
}
