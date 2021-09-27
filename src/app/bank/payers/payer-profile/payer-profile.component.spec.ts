import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerProfileComponent } from './payer-profile.component';

describe('PayerProfileComponent', () => {
  let component: PayerProfileComponent;
  let fixture: ComponentFixture<PayerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PayerProfileComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
