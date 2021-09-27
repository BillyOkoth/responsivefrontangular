import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPayersComponent } from './upload-payers.component';

describe('UploadPayersComponent', () => {
  let component: UploadPayersComponent;
  let fixture: ComponentFixture<UploadPayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
