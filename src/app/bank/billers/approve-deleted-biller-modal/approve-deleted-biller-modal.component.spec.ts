import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDeletedBillerModalComponent } from './approve-deleted-biller-modal.component';

describe('ApproveDeletedBillerModalComponent', () => {
  let component: ApproveDeletedBillerModalComponent;
  let fixture: ComponentFixture<ApproveDeletedBillerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDeletedBillerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDeletedBillerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
