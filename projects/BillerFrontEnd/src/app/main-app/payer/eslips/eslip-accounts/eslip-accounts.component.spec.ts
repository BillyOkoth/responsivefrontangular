import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EslipAccountsComponent } from './eslip-accounts.component';

describe('EslipAccountsComponent', () => {
  let component: EslipAccountsComponent;
  let fixture: ComponentFixture<EslipAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EslipAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EslipAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
