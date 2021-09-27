import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmServiceChargeApprovalComponent } from './confirm-service-charge-approval.component';

describe('ConfirmServiceChargeApprovalComponent', () => {
  let component: ConfirmServiceChargeApprovalComponent;
  let fixture: ComponentFixture<ConfirmServiceChargeApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmServiceChargeApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmServiceChargeApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
