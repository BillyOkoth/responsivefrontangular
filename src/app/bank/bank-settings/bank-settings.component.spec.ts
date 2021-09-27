import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankSettingsComponent } from './bank-settings.component';

describe('BankSettingsComponent', () => {
  let component: BankSettingsComponent;
  let fixture: ComponentFixture<BankSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
