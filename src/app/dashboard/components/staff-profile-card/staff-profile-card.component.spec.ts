import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProfileCardComponent } from './staff-profile-card.component';

describe('StaffProfileCardComponent', () => {
  let component: StaffProfileCardComponent;
  let fixture: ComponentFixture<StaffProfileCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffProfileCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
