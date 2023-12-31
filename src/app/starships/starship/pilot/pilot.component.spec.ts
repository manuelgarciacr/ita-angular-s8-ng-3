import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotComponent } from './pilot.component';

describe('PilotComponent', () => {
  let component: PilotComponent;
  let fixture: ComponentFixture<PilotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PilotComponent]
    });
    fixture = TestBed.createComponent(PilotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
