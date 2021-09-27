import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveNewGroupModalComponent } from './approve-new-group-modal.component';

describe('ApproveNewGroupModalComponent', () => {
  let component: ApproveNewGroupModalComponent;
  let fixture: ComponentFixture<ApproveNewGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveNewGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveNewGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
