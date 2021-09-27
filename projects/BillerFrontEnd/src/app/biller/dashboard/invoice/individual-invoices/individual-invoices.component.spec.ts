import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualInvoicesComponent } from './individual-invoices.component';

describe('IndividualInvoicesComponent', () => {
  let component: IndividualInvoicesComponent;
  let fixture: ComponentFixture<IndividualInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
