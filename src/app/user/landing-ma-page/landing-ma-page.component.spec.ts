import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingMaPageComponent } from './landing-ma-page.component';

describe('LandingMaPageComponent', () => {
  let component: LandingMaPageComponent;
  let fixture: ComponentFixture<LandingMaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingMaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingMaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
