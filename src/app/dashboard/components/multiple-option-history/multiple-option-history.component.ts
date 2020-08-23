import { Component, OnInit } from '@angular/core';
import { ScoreHistoryService } from '@app/dashboard/score-history.service';
import { MultipleOptionTest } from '@app/dashboard/models/multiple-option-test';

import { fader } from '@app/route-animations';
import { ScoreboardService } from '@app/dashboard/scoreboard.service';

@Component({
  selector: 'app-multiple-option-history',
  templateUrl: './multiple-option-history.component.html',
  styleUrls: ['./multiple-option-history.component.css'],
  animations: [fader]
})
export class MultipleOptionHistoryComponent {
  multipleOptions: MultipleOptionTest[];
  loadingScoreHistory: boolean;

  constructor(private scoreHistoryService: ScoreHistoryService, private scoreboardService: ScoreboardService) {
    scoreHistoryService.multipleOptions$.subscribe(multipleOptions => this.multipleOptions = multipleOptions);
    scoreHistoryService.isLoadingScoreHistory$.subscribe(isLoadingScoreHistory => this.loadingScoreHistory = isLoadingScoreHistory);
  }

  calculateAnswerColor(optionIndex: number, userAnswers: number[], rightAnswers: number[]) : string {
    for(let userAnswer of userAnswers) {
      if(rightAnswers.includes(optionIndex) && userAnswers.includes(optionIndex)) {
        return 'full-score-obtained';
      } else if (rightAnswers.includes(optionIndex) && !userAnswers.includes(optionIndex)) {
        return 'partial-score-obtained';
      } else if (!rightAnswers.includes(optionIndex) && userAnswers.includes(optionIndex)) {
        return 'zero-score-obtained';
      }
      return 'score-default';
    }
  }

calculateScore(maxScore: number, scoredRatio: number) {
    let unroundedScore = maxScore * scoredRatio;
    return this.scoreboardService.roundScore(unroundedScore);
  }
}
