import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingDemoRequestComponent } from './landing-demo-request.component';

describe('LandingDemoRequestComponent', () => {
  let component: LandingDemoRequestComponent;
  let fixture: ComponentFixture<LandingDemoRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingDemoRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingDemoRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
