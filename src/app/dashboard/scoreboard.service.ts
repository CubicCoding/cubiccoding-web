import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

import { environment } from '@environments/environment';
import { ScoreboardInfo } from '@app/dashboard/models/scoreboard-info';
import { AuthService } from '@app/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {
  private scoreboardSubject = new ReplaySubject<ScoreboardInfo>();
  public scoreboardInfo = this.scoreboardSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) { }

  getScoreboard() {
    let currentProfile = this.authService.currentUserValue;
    let classroomName = currentProfile.classroomName;
    let email = currentProfile.email;

    return this.http.get<ScoreboardInfo>(`${environment.hostApiUrl}/api/scoreboard?classroomName=${classroomName}&email=${email}`, { observe: 'response' })
      .pipe(map(response => {
        let scoreboardInfo = response.body;
        this.scoreboardSubject.next(scoreboardInfo);
        return scoreboardInfo;
      }));
  }
}
