import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountReportSummaryComponent } from './account-report-summary.component';

describe('AccountReportSummaryComponent', () => {
  let component: AccountReportSummaryComponent;
  let fixture: ComponentFixture<AccountReportSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountReportSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountReportSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
