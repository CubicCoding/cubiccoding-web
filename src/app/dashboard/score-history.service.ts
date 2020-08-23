import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { MultipleOptionTest } from './models/multiple-option-test';
import { ChallengeTest } from './models/challenge-test';

@Injectable({
  providedIn: 'root'
})
export class ScoreHistoryService {

  private loadingScoreHistory: Subject<boolean> = new BehaviorSubject<boolean>(false);
  private multipleOptions: Subject<MultipleOptionTest[]> = new BehaviorSubject<MultipleOptionTest[]>([]);
  private challenges: Subject<ChallengeTest[]> = new BehaviorSubject<ChallengeTest[]>([]);

  constructor() { }

  get multipleOptions$() {
    return this.multipleOptions.asObservable();
  }

  addMultipleOptions(data: MultipleOptionTest[]) {
    for(let multipleOptionTest of data) {
      multipleOptionTest.createdDate = this.fromUTCtoLocalDate(multipleOptionTest.createdDate);
    }

    this.multipleOptions.next(data);
  }

  addChallenges(data: ChallengeTest[]) {
    for(let challenge of data) {
      challenge.createdDate = this.fromUTCtoLocalDate(challenge.createdDate);
    }

    this.challenges.next(data);
  }

  private fromUTCtoLocalDate(createdDate: Date) {
    createdDate = new Date(createdDate.toString());
    return new Date(createdDate + ' UTC');
  }

  get challenges$() {
    return this.challenges.asObservable();
  }

  get isLoadingScoreHistory$() {
    return this.loadingScoreHistory.asObservable();
  }

  setLoadingScoreHistory(loadingScoreHistory: boolean) {
    this.loadingScoreHistory.next(loadingScoreHistory);
  }
}
