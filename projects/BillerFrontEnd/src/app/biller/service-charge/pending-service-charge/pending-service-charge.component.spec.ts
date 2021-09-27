import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingServiceChargeComponent } from './pending-service-charge.component';

describe('PendingServiceChargeComponent', () => {
  let component: PendingServiceChargeComponent;
  let fixture: ComponentFixture<PendingServiceChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingServiceChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingServiceChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
