import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarPlayerEditorComponent } from './star-player-editor.component';

describe('StarPlayerEditorComponent', () => {
  let component: StarPlayerEditorComponent;
  let fixture: ComponentFixture<StarPlayerEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarPlayerEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarPlayerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
