import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEditBillerComponent } from './approve-edit-biller.component';

describe('ApproveEditBillerComponent', () => {
  let component: ApproveEditBillerComponent;
  let fixture: ComponentFixture<ApproveEditBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveEditBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEditBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
