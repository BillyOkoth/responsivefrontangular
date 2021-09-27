import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDeletedComponent } from './approve-deleted.component';

describe('ApproveDeletedComponent', () => {
  let component: ApproveDeletedComponent;
  let fixture: ComponentFixture<ApproveDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
