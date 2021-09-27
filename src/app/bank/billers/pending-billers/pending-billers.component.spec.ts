import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBillersComponent } from './pending-billers.component';

describe('PendingBillersComponent', () => {
  let component: PendingBillersComponent;
  let fixture: ComponentFixture<PendingBillersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingBillersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingBillersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
