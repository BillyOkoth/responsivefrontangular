import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEditedBankUserModalComponent } from './approve-edited-bank-user-modal.component';

describe('ApproveEditedBankUserModalComponent', () => {
  let component: ApproveEditedBankUserModalComponent;
  let fixture: ComponentFixture<ApproveEditedBankUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveEditedBankUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEditedBankUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
