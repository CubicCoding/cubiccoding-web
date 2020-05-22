import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@app/auth/auth.service';
import { UserProfile } from '@app/shared/user-profile';
import { ScoreboardService } from '@app/dashboard/scoreboard.service';

import { ScoreboardInfo } from '@app/dashboard/models/scoreboard-info';
import { ScorePrimary } from '@app/dashboard/models/score-primary';
import { CourseName } from '@app/dashboard/models/course-name';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  primary: ScorePrimary;
  userProfile: UserProfile;
  defaultUrl = 'assets/images/default-avatar.JPG';
  scoreboardInfo: ScoreboardInfo;
  loading = false;

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private scoreboardservice: ScoreboardService) {
    this.authService.userProfile.subscribe(userProfile => this.userProfile = userProfile);
    this.scoreboardservice.scoreboardInfo.subscribe(scoreboardInfo => this.scoreboardInfo != null ? scoreboardInfo : null );
  }

  ngOnInit(): void {
    let isRecentlyLoggedIn = localStorage.getItem("isRecentlyLoggedIn");

    //Only display welcome toast when user is recently logged in
    if (isRecentlyLoggedIn) {
      localStorage.removeItem("isRecentlyLoggedIn");
      let studentName = this.authService.currentUserValue.name;
      this.toastr.success(`¡Bienvenido, ${studentName}!`, "CubicCoding", {
        positionClass: 'toast-top-center'
      });
    }

    //Grab the scoreboard if subject doesn't provide it
    if(!this.scoreboardInfo) {
      this.loading = true;
      this.scoreboardservice.getScoreboard()
        .subscribe(
          data => {
            this.loading = false;
            if(data.primary != null) {
              this.primary =  data.primary;
              this.primary.username = this.userProfile.username;
              this.primary.username = this.userProfile.username;
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

  private handleError(statusCode: number) {
    if(statusCode == 404) {
      //If scoreboard is not found, set the properties available in the currentProfile object
      this.setDefaultPrimaryProperties();
    }
  }

  private setDefaultPrimaryProperties() {
    this.primary = new ScorePrimary();
    this.primary.courseName = CourseName[this.userProfile.courseName];
    this.primary.displayName = this.userProfile.name + ' ' + this.userProfile.firstSurname;
    this.primary.startDate = this.parseAndGetDate(this.userProfile.createDate.date);
    this.primary.email = this.userProfile.email;
    this.primary.username = this.userProfile.username;
  }

  private parseAndGetDate(dateObject: any): Date {
    let day = dateObject.day.toString();
    let month = dateObject.month.toString();
    let year = dateObject.year.toString();
    let dateStr = year + '-' + month + '-' + day;

    return new Date(dateStr);
  }
}
