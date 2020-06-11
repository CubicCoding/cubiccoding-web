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

  get multipleOptions$() {
    return this.multipleOptions.asObservable();
  }

  addMultipleOptions(data: MultipleOptionTest[]) {
    this.multipleOptions.next(data);
  }

  get challenges$() {
    return this.challenges.asObservable();
  }

  addChallenges(data: ChallengeTest[]) {
    this.challenges.next(data);
  }

  get isLoadingScoreHistory$() {
    return this.loadingScoreHistory.asObservable();
  }

  setLoadingScoreHistory(loadingScoreHistory: boolean) {
    this.loadingScoreHistory.next(loadingScoreHistory);
  }

  constructor() { }
}
