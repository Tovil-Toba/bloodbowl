import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRosterInfoComponent } from './team-roster-info.component';

describe('TeamRosterInfoComponent', () => {
  let component: TeamRosterInfoComponent;
  let fixture: ComponentFixture<TeamRosterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamRosterInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRosterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
