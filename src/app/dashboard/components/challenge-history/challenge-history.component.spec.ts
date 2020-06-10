import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeHistoryComponent } from './challenge-history.component';

describe('ChallengeHistoryComponent', () => {
  let component: ChallengeHistoryComponent;
  let fixture: ComponentFixture<ChallengeHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
