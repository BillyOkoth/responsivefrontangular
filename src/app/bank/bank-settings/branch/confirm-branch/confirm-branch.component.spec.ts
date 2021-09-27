import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBranchComponent } from './confirm-branch.component';

describe('ConfirmBranchComponent', () => {
  let component: ConfirmBranchComponent;
  let fixture: ComponentFixture<ConfirmBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
