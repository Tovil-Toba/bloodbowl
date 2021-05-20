import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsCategoryComponent } from './skills-category.component';

describe('SkillsCategoryComponent', () => {
  let component: SkillsCategoryComponent;
  let fixture: ComponentFixture<SkillsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
