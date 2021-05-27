import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialRulesInfoComponent } from './special-rules-info.component';

describe('SpecialRulesInfoComponent', () => {
  let component: SpecialRulesInfoComponent;
  let fixture: ComponentFixture<SpecialRulesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialRulesInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialRulesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
