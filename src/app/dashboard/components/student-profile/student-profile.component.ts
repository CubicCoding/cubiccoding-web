import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@app/auth/auth.service';
import { UserProfile } from '@app/shared/user-profile';
import { ScoreboardService } from '@app/dashboard/scoreboard.service';

import { ScorePrimary } from '@app/dashboard/models/score-primary';
import { CourseName } from '@app/dashboard/models/course-name';

import { fader } from '@app/route-animations';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
  animations: [fader]
})
export class StudentProfileComponent implements OnInit {
  primary: ScorePrimary;
  userProfile: UserProfile;
  defaultUrl = 'assets/images/default-avatar.JPG';
  loading = false;

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private scoreboardservice: ScoreboardService) {
    this.authService.userProfile.subscribe(userProfile => this.userProfile = userProfile);
    this.scoreboardservice.scoreboardInfo.subscribe(scoreboardInfo => {
      if(scoreboardInfo.primary != null) {
        this.primary = scoreboardInfo.primary;
        this.primary.username = this.userProfile.username;
        this.primary.classroomName = scoreboardInfo.tournamentInfo.classroomName;
      }
    });
  }

  ngOnInit(): void {
    //Grab the scoreboard if subject doesn't provide it
    if(!this.primary) {
      this.loading = true;
      this.scoreboardservice.getScoreboard()
        .subscribe(
          data => {
            this.loading = false;
            if(data.primary != null) {
              this.primary =  data.primary;
              this.setPrimaryProperties();
            } else {
              this.setDefaultPrimaryProperties();
            }
          },
          error => {
            this.loading = false;
            this.handleError(error.status);
          });
    }
  }

  private setPrimaryProperties() {
    this.primary.username = this.userProfile.username;
    this.primary.startDate = this.fromUTCtoLocalDate(this.primary.startDate);
    this.primary.courseName = CourseName[this.userProfile.courseName];
  }

  private handleError(statusCode: number) {
    if(statusCode == 404 || statusCode == 0) {
      //If scoreboard is not found or server is down but we have profile information, 
      //set the properties available in the currentProfile object
      this.setDefaultPrimaryProperties();
    }
  }

  private setDefaultPrimaryProperties() {
    this.primary = new ScorePrimary();
    this.primary.courseName = CourseName[this.userProfile.courseName];
    this.primary.displayName = this.userProfile.name + ' ' + this.userProfile.firstSurname;
    this.primary.startDate = this.parseAndGetDate(this.userProfile.createDate);
    this.primary.email = this.userProfile.email;
    this.primary.username = this.userProfile.username;
  }

  private parseAndGetDate(dateObject: any): Date {
    let date = this.getDateFromObject(dateObject.date);
    let time = this.getTimeFromObject(dateObject.time);

    let startDate = new Date(date + ' ' + time); 
    return new Date(startDate + ' UTC');
  }

  private getDateFromObject(date: any) {
    let day = date.day.toString();
    let month = date.month.toString();
    let year = date.year.toString();

    return year + '-' + month + '-' + day;
  }

  private getTimeFromObject(time: any) {
    let hour = time.hour.toString();
    let minute = time.minute.toString();
    let second = time.second.toString();

    return hour + ':' + minute + ':' + second;
  }

  private fromUTCtoLocalDate(createdDate: Date) {
    createdDate = new Date(createdDate.toString());
    return new Date(createdDate + ' UTC');
  }
}
