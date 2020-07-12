import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

import { AuthService } from '@app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  getClassroom() {
    let currentProfile = this.auth.currentUserValue;
    let classroomName = currentProfile.classroomName;

    return this.http.get<any>(`${environment.hostApiUrl}/api/classrooms/${classroomName}/timeline-progress`, { observe: 'response' })
      .pipe(map(response => {
        return response.body;
      }));
  }

  getTimelineResource(timelineResource: string) {
    return this.http.get<any>(`${environment.hostApiUrl}/${timelineResource}`, { observe: 'response' })
      .pipe(map(response => {
        return response.body;
      }));
  }
}
