import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDeletedBankUserModalComponent } from './approve-deleted-bank-user-modal.component';

describe('ApproveDeletedBankUserModalComponent', () => {
  let component: ApproveDeletedBankUserModalComponent;
  let fixture: ComponentFixture<ApproveDeletedBankUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDeletedBankUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDeletedBankUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
