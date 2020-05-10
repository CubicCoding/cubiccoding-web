import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '@environments/environment';

import { User } from '@app/shared/User';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  private user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.currentUserSubject.asObservable();
  }

  public get userValue(): User {
    return this.currentUserSubject.value;
  }

  getVoucher(voucherUuid: string) {
    return this.http.get<User>(`${environment.baseApiUrl}/vouchers/${voucherUuid}`);
  }

  signup(user: User) {
    return this.http.post(`${environment.baseApiUrl}/students/signup`, user);
  }
}
