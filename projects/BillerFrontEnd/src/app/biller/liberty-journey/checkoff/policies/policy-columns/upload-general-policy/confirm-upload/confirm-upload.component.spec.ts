import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUploadComponent } from './confirm-upload.component';

describe('ConfirmUploadComponent', () => {
  let component: ConfirmUploadComponent;
  let fixture: ComponentFixture<ConfirmUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
