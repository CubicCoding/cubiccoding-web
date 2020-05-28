import { Component, OnInit } from '@angular/core';
import { ScoreboardService } from '@app/dashboard/scoreboard.service';
import { ScoreSecondary } from '@app/dashboard/models/score-secondary';
import { UserProfile } from '@app/shared/user-profile';
import { AuthService } from '@app/auth/auth.service';
import { Tournament } from '@app/dashboard/models/tournament';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  secondaries: ScoreSecondary[];
  tournamentInfo: Tournament;
  userProfile: UserProfile;
  loading: boolean = false;
  error: string;
  nonFirstPlaceIconUrl: string = "assets/icons/cc-inverted-pentagon-blue.png";

  constructor(private scoreboardService: ScoreboardService, private authService: AuthService) {
    this.authService.userProfile.subscribe( userProfile => this.userProfile = userProfile);
    this.scoreboardService.scoreboardInfo.subscribe(scoreboardInfo => {
      this.secondaries = scoreboardInfo.secondaries;
      this.tournamentInfo = scoreboardInfo.tournamentInfo;
    });
  }

  ngOnInit(): void {
    if(!this.secondaries || !this.tournamentInfo) {
      this.loading = true;
      this.scoreboardService.getScoreboard()
        .subscribe(
          data => {
            this.loading = false;
            if(data.secondaries) {
              this.secondaries = data.secondaries;
            }
            if(data.tournamentInfo) {
              this.tournamentInfo = data.tournamentInfo;
            }
          },
          error => {
            this.loading = false;
            this.handleError(error.status);
          });
    }
  }

  private handleError(statusCode: number) {
    if(statusCode == 0) {
      this.error = "No fue posible obtener el scoreboard en este momento, vuelve a intentarlo mas tarde.";
    }
  }
}
