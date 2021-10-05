import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginConfigPopupComponent } from './plugin-config-popup.component';

describe('PluginConfigPopupComponent', () => {
  let component: PluginConfigPopupComponent;
  let fixture: ComponentFixture<PluginConfigPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PluginConfigPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginConfigPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
