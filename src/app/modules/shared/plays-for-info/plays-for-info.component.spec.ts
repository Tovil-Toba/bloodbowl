import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaysForInfoComponent } from './plays-for-info.component';

describe('PlaysForInfoComponent', () => {
  let component: PlaysForInfoComponent;
  let fixture: ComponentFixture<PlaysForInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaysForInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaysForInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
