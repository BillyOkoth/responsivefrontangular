import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplePayerConfirmDialogComponent } from './multiple-payer-confirm-dialog.component';

describe('MultiplePayerConfirmDialogComponent', () => {
  let component: MultiplePayerConfirmDialogComponent;
  let fixture: ComponentFixture<MultiplePayerConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplePayerConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplePayerConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
