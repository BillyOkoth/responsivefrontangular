import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerMapListComponent } from './payer-map-list.component';

describe('PayerMapListComponent', () => {
  let component: PayerMapListComponent;
  let fixture: ComponentFixture<PayerMapListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayerMapListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerMapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
