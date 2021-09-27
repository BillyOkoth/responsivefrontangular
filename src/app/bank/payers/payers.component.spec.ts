import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayersComponent } from './payers.component';

describe('PayersComponent', () => {
  let component: PayersComponent;
  let fixture: ComponentFixture<PayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
