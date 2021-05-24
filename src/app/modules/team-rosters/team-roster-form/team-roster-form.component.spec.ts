import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRosterFormComponent } from './team-roster-form.component';

describe('TeamRosterFormComponent', () => {
  let component: TeamRosterFormComponent;
  let fixture: ComponentFixture<TeamRosterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamRosterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRosterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
