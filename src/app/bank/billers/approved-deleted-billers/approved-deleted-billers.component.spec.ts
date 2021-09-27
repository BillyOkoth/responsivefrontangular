import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedDeletedBillersComponent } from './approved-deleted-billers.component';

describe('ApprovedDeletedBillersComponent', () => {
  let component: ApprovedDeletedBillersComponent;
  let fixture: ComponentFixture<ApprovedDeletedBillersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedDeletedBillersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedDeletedBillersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
