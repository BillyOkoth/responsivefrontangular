import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEditedGroupModalComponent } from './approve-edited-group-modal.component';

describe('ApproveEditedGroupModalComponent', () => {
  let component: ApproveEditedGroupModalComponent;
  let fixture: ComponentFixture<ApproveEditedGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveEditedGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEditedGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
