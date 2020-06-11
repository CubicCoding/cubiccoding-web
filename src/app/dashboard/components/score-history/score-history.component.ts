import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';

import { ScoreSecondary } from '@app/dashboard/models/score-secondary';
import { ScoreboardService } from '@app/dashboard/scoreboard.service';
import { Tournament } from '@app/dashboard/models/tournament';
import { ScoreHistoryService } from '@app/dashboard/score-history.service';

import { fader } from '@app/route-animations';

@Component({
  selector: 'app-score-history',
  templateUrl: './score-history.component.html',
  styleUrls: ['./score-history.component.css'],
  animations: [fader]
})
export class ScoreHistoryComponent implements OnInit {
  tournamentInfo: Tournament;
  email: string;
  scoreSecondary: ScoreSecondary;
  loading: boolean;
  defaultUrl = 'assets/images/default-avatar.JPG';

  constructor(private route: ActivatedRoute, private authService: AuthService, 
    private scoreboardService: ScoreboardService, private scoreHistoryService: ScoreHistoryService) {
    this.authService.userProfile.subscribe(userProfile => this.email = userProfile.email);
    this.email = this.route.snapshot.paramMap.get("email");
    this.scoreboardService.scoreboardInfo.subscribe(scoreboardInfo => {
      this.scoreSecondary = this.getScoreSecondary(this.email, scoreboardInfo.secondaries);
      this.tournamentInfo = scoreboardInfo.tournamentInfo;
    });
  }

  ngOnInit(): void {
    if (!this.scoreSecondary || !this.tournamentInfo) {
      this.loading = true;
      this.refreshScoreboard();
    } else {
      this.getScoreHistory();
    }
  }

  private refreshScoreboard() {
    this.loading = true;
    this.scoreboardService.getScoreboard()
      .subscribe(
        data => {
          this.loading = false;
          this.scoreSecondary = this.getScoreSecondary(this.email, data.secondaries);
          this.tournamentInfo = data.tournamentInfo;
          this.getScoreHistory();
        },
        error => {
          this.loading = false;
        });
  }

  private getScoreHistory() {
    this.scoreHistoryService.setLoadingScoreHistory(true);
    this.scoreboardService.getScoreHistory(this.tournamentInfo.id, this.email)
      .subscribe(
        data => {
          this.scoreHistoryService.setLoadingScoreHistory(false);
          this.loading = false;
          this.scoreHistoryService.addMultipleOptions(data.multipleOptions);
          this.scoreHistoryService.addChallenges(data.challenges);
        },
        error => {
          this.loading = false;
          this.scoreHistoryService.setLoadingScoreHistory(false);
        });
  }

  private getScoreSecondary(email: string, secondaries: ScoreSecondary[]): ScoreSecondary {
    return secondaries.find(secondary => secondary.email == email);
  }
}
