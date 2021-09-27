import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedInvoicesComponent } from './uploaded-invoices.component';

describe('UploadedInvoicesComponent', () => {
  let component: UploadedInvoicesComponent;
  let fixture: ComponentFixture<UploadedInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
