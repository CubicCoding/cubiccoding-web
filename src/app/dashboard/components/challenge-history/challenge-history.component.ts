import { Component, OnInit } from '@angular/core';
import { ChallengeTest } from '@app/dashboard/models/challenge-test';
import { ScoreHistoryService } from '@app/dashboard/score-history.service';

@Component({
  selector: 'app-challenge-history',
  templateUrl: './challenge-history.component.html',
  styleUrls: ['./challenge-history.component.css']
})
export class ChallengeHistoryComponent implements OnInit {

  challenges: ChallengeTest[];

  constructor(private scoreHistoryService: ScoreHistoryService) { 
    scoreHistoryService.challenges$.subscribe(challenges => this.challenges = challenges);
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
}
