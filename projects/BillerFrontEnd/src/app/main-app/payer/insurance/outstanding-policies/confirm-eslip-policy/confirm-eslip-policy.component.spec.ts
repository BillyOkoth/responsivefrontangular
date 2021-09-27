import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEslipPolicyComponent } from './confirm-eslip-policy.component';

describe('ConfirmEslipPolicyComponent', () => {
  let component: ConfirmEslipPolicyComponent;
  let fixture: ComponentFixture<ConfirmEslipPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmEslipPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEslipPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
