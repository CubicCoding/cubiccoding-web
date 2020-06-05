import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreTestModalComponent } from './score-test-modal.component';

describe('ScoreTestModalComponent', () => {
  let component: ScoreTestModalComponent;
  let fixture: ComponentFixture<ScoreTestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreTestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreTestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
