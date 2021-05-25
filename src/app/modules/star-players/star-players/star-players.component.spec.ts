import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarPlayersComponent } from './star-players.component';

describe('StarPlayersComponent', () => {
  let component: StarPlayersComponent;
  let fixture: ComponentFixture<StarPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
