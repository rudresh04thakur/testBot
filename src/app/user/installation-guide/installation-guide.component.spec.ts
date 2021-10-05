import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationGuideComponent } from './installation-guide.component';

describe('InstallationGuideComponent', () => {
  let component: InstallationGuideComponent;
  let fixture: ComponentFixture<InstallationGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallationGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
