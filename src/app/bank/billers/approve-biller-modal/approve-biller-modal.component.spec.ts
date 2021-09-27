import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveBillerModalComponent } from './approve-biller-modal.component';

describe('ApproveBillerModalComponent', () => {
  let component: ApproveBillerModalComponent;
  let fixture: ComponentFixture<ApproveBillerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveBillerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveBillerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
