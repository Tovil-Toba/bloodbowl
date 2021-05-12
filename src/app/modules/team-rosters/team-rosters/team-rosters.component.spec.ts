import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRostersComponent } from './team-rosters.component';

describe('TeamRostersComponent', () => {
  let component: TeamRostersComponent;
  let fixture: ComponentFixture<TeamRostersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamRostersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
