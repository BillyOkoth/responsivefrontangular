import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHistoryDetailsComponent } from './report-history-details.component';

describe('ReportHistoryDetailsComponent', () => {
  let component: ReportHistoryDetailsComponent;
  let fixture: ComponentFixture<ReportHistoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportHistoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
