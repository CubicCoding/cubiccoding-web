import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankAvatarComponent } from './rank-avatar.component';

describe('RankAvatarComponent', () => {
  let component: RankAvatarComponent;
  let fixture: ComponentFixture<RankAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
