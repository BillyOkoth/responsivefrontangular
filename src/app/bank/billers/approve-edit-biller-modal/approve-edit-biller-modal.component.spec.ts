import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEditBillerModalComponent } from './approve-edit-biller-modal.component';

describe('ApproveEditBillerModalComponent', () => {
  let component: ApproveEditBillerModalComponent;
  let fixture: ComponentFixture<ApproveEditBillerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveEditBillerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEditBillerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
