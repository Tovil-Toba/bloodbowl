import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRosterEditorComponent } from './team-roster-editor.component';

describe('TeamRosterEditorComponent', () => {
  let component: TeamRosterEditorComponent;
  let fixture: ComponentFixture<TeamRosterEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamRosterEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRosterEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
