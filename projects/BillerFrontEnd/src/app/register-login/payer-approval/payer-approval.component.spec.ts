import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerApprovalComponent } from './payer-approval.component';

describe('PayerApprovalComponent', () => {
  let component: PayerApprovalComponent;
  let fixture: ComponentFixture<PayerApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayerApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
