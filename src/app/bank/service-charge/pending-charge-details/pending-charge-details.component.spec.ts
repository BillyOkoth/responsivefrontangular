import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingChargeDetailsComponent } from './pending-charge-details.component';

describe('PendingChargeDetailsComponent', () => {
  let component: PendingChargeDetailsComponent;
  let fixture: ComponentFixture<PendingChargeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingChargeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingChargeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
