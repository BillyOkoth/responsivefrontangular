import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEditedComponent } from './approve-edited.component';

describe('ApproveEditedComponent', () => {
  let component: ApproveEditedComponent;
  let fixture: ComponentFixture<ApproveEditedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveEditedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEditedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
