import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarPlayerComponent } from './star-player.component';

describe('StarPlayerComponent', () => {
  let component: StarPlayerComponent;
  let fixture: ComponentFixture<StarPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
