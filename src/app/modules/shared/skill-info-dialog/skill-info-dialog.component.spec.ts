import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillInfoDialogComponent } from './skill-info-dialog.component';

describe('SkillInfoDialogComponent', () => {
  let component: SkillInfoDialogComponent;
  let fixture: ComponentFixture<SkillInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
