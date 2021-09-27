import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputedInvoicesComponent } from './disputed-invoices.component';

describe('DisputedInvoicesComponent', () => {
  let component: DisputedInvoicesComponent;
  let fixture: ComponentFixture<DisputedInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisputedInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisputedInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
