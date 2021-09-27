import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EslipBillsComponent } from './eslip-bills.component';

describe('EslipBillsComponent', () => {
  let component: EslipBillsComponent;
  let fixture: ComponentFixture<EslipBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EslipBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EslipBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
