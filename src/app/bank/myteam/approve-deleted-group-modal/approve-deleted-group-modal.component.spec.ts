import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDeletedGroupModalComponent } from './approve-deleted-group-modal.component';

describe('ApproveDeletedGroupModalComponent', () => {
  let component: ApproveDeletedGroupModalComponent;
  let fixture: ComponentFixture<ApproveDeletedGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDeletedGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDeletedGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
