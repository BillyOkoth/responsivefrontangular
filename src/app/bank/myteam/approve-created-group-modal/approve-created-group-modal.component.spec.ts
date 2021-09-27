import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCreatedGroupModalComponent } from './approve-created-group-modal.component';

describe('ApproveCreatedGroupModalComponent', () => {
  let component: ApproveCreatedGroupModalComponent;
  let fixture: ComponentFixture<ApproveCreatedGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveCreatedGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCreatedGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
