import { Component, OnInit } from '@angular/core';
import { ScoreHistoryService } from '@app/dashboard/score-history.service';
import { MultipleOptionTest } from '@app/dashboard/models/multiple-option-test';

@Component({
  selector: 'app-multiple-option-history',
  templateUrl: './multiple-option-history.component.html',
  styleUrls: ['./multiple-option-history.component.css']
})
export class MultipleOptionHistoryComponent implements OnInit {
  multipleOptions: MultipleOptionTest[];

  constructor(private scoreHistoryService: ScoreHistoryService) {
    scoreHistoryService.multipleOptions$.subscribe(multipleOptions => this.multipleOptions = multipleOptions);
  }

  ngOnInit(): void {
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
}
