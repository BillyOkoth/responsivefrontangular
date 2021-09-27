import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedBillersComponent } from './invited-billers.component';

describe('InvitedBillersComponent', () => {
  let component: InvitedBillersComponent;
  let fixture: ComponentFixture<InvitedBillersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedBillersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedBillersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
