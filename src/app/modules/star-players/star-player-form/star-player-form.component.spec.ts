import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarPlayerFormComponent } from './star-player-form.component';

describe('StarPlayerFormComponent', () => {
  let component: StarPlayerFormComponent;
  let fixture: ComponentFixture<StarPlayerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarPlayerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarPlayerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
