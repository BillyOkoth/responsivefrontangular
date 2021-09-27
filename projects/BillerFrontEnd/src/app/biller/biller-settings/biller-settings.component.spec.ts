import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillerSettingsComponent } from './biller-settings.component';

describe('BillerSettingsComponent', () => {
  let component: BillerSettingsComponent;
  let fixture: ComponentFixture<BillerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillerSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
