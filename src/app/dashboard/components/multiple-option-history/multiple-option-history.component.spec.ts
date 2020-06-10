import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleOptionHistoryComponent } from './multiple-option-history.component';

describe('MultipleOptionHistoryComponent', () => {
  let component: MultipleOptionHistoryComponent;
  let fixture: ComponentFixture<MultipleOptionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleOptionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleOptionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
