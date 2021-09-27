import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingLinesComponent } from './billing-lines.component';

describe('BillingLinesComponent', () => {
  let component: BillingLinesComponent;
  let fixture: ComponentFixture<BillingLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
