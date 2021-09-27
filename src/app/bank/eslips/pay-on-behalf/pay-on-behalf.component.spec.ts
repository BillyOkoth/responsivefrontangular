import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayOnBehalfComponent } from './pay-on-behalf.component';

describe('PayOnBehalfComponent', () => {
  let component: PayOnBehalfComponent;
  let fixture: ComponentFixture<PayOnBehalfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayOnBehalfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayOnBehalfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
