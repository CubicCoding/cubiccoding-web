import { Component, OnInit } from '@angular/core';
import { ChallengeTest } from '@app/dashboard/models/challenge-test';
import { ScoreHistoryService } from '@app/dashboard/score-history.service';

import { fader } from '@app/route-animations';
import { ScoreboardService } from '@app/dashboard/scoreboard.service';

@Component({
  selector: 'app-challenge-history',
  templateUrl: './challenge-history.component.html',
  styleUrls: ['./challenge-history.component.css'],
  animations: [fader]
})
export class ChallengeHistoryComponent implements OnInit {
  challenges: ChallengeTest[];
  loadingScoreHistory: boolean;

  constructor(private scoreHistoryService: ScoreHistoryService, private scoreboardService: ScoreboardService) { 
    scoreHistoryService.challenges$.subscribe(challenges => this.challenges = challenges);
    scoreHistoryService.isLoadingScoreHistory$.subscribe(isLoadingScoreHistory => this.loadingScoreHistory = isLoadingScoreHistory);
  }

  ngOnInit(): void {
  }

  calculateChallengeColor(scoredRatio: number) : string {
      if(scoredRatio == 1) {
        return 'full-score-obtained';
      } else if (scoredRatio > 0) {
        return 'partial-score-obtained';
      }
      return 'zero-score-obtained';
  }

  calculateScore(maxScore: number, scoredRatio: number) {
    let unroundedScore = maxScore * scoredRatio;
    return this.scoreboardService.roundScore(unroundedScore);
  }
}
