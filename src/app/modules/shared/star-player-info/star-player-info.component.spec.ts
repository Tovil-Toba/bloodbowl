import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarPlayerInfoComponent } from './star-player-info.component';

describe('StarPlayerInfoComponent', () => {
  let component: StarPlayerInfoComponent;
  let fixture: ComponentFixture<StarPlayerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarPlayerInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarPlayerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
