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
