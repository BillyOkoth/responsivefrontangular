import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveBankUserModalComponent } from './approve-bank-user-modal.component';

describe('ApproveBankUserModalComponent', () => {
  let component: ApproveBankUserModalComponent;
  let fixture: ComponentFixture<ApproveBankUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveBankUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveBankUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
