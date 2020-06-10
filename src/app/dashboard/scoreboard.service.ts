import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

import { environment } from '@environments/environment';
import { ScoreboardInfo } from '@app/dashboard/models/scoreboard-info';
import { AuthService } from '@app/auth/auth.service';
import { map } from 'rxjs/operators';
import { ScoreTest } from './models/score-test';

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

  getScoreTest(scoreTestUuid) {
    return this.http.get<ScoreTest>(`${environment.hostApiUrl}/api/v1/scoreboard/score-tests/${scoreTestUuid}`, { observe: 'response' })
      .pipe(map(response => {
        let scoreTest = response.body;
        return scoreTest;
      }));
  }

  createScoreAnswer(scoreTestUuid: string, userAnswers: number[]) {
    let scoreAnswer = {
      scoreTestUuid: scoreTestUuid,
      userAnswers: userAnswers
    }

    return this.http.post<any>(`${environment.hostApiUrl}/api/scoreboard/score-answers`, scoreAnswer, { observe: 'response' })
      .pipe(map(response => response.body));
  }

  getScoreHistory(tournamentId: number, email: string) {
    return this.http.get<any>(`${environment.hostApiUrl}/api/scoreboard/history?tournamentId=${tournamentId}&email=${email}`, { observe: 'response'})
      .pipe(map(response => response.body));
  }
}
