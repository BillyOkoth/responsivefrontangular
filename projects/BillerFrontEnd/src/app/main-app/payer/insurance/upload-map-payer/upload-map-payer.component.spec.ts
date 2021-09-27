import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMapPayerComponent } from './upload-map-payer.component';

describe('UploadMapPayerComponent', () => {
  let component: UploadMapPayerComponent;
  let fixture: ComponentFixture<UploadMapPayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMapPayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMapPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
