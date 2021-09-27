import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerMemberComponent } from './payer-member.component';

describe('PayerMemberComponent', () => {
  let component: PayerMemberComponent;
  let fixture: ComponentFixture<PayerMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayerMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
