import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerUploadTabComponent } from './payer-upload-tab.component';

describe('PayerUploadTabComponent', () => {
  let component: PayerUploadTabComponent;
  let fixture: ComponentFixture<PayerUploadTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayerUploadTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerUploadTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
