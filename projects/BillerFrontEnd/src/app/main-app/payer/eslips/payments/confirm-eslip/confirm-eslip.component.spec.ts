import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEslipComponent } from './confirm-eslip.component';

describe('ConfirmEslipComponent', () => {
  let component: ConfirmEslipComponent;
  let fixture: ComponentFixture<ConfirmEslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmEslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
