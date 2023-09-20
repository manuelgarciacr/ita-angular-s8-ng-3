import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipComponent } from './starship.component';

describe('StarshipComponent', () => {
  let component: StarshipComponent;
  let fixture: ComponentFixture<StarshipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StarshipComponent]
    });
    fixture = TestBed.createComponent(StarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
