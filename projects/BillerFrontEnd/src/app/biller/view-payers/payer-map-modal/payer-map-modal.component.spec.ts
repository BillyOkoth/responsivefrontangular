import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerMapModalComponent } from './payer-map-modal.component';

describe('PayerMapModalComponent', () => {
  let component: PayerMapModalComponent;
  let fixture: ComponentFixture<PayerMapModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayerMapModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerMapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
