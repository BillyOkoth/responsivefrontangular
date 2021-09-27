import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayEslipComponent } from './pay-eslip.component';

describe('PayEslipComponent', () => {
  let component: PayEslipComponent;
  let fixture: ComponentFixture<PayEslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayEslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayEslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
