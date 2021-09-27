import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountReportsComponent } from './account-reports.component';

describe('AccountReportsComponent', () => {
  let component: AccountReportsComponent;
  let fixture: ComponentFixture<AccountReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
