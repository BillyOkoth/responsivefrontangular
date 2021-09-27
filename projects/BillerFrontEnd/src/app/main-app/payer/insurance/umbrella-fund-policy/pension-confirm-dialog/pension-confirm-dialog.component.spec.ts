import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionConfirmDialogComponent } from './pension-confirm-dialog.component';

describe('PensionConfirmDialogComponent', () => {
  let component: PensionConfirmDialogComponent;
  let fixture: ComponentFixture<PensionConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
