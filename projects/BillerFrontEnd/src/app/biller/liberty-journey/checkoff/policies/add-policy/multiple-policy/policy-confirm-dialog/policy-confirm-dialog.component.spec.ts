import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyConfirmDialogComponent } from './policy-confirm-dialog.component';

describe('PolicyConfirmDialogComponent', () => {
  let component: PolicyConfirmDialogComponent;
  let fixture: ComponentFixture<PolicyConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
