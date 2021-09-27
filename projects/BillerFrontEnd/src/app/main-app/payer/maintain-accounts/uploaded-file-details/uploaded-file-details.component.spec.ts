import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedFileDetailsComponent } from './uploaded-file-details.component';

describe('UploadedFileDetailsComponent', () => {
  let component: UploadedFileDetailsComponent;
  let fixture: ComponentFixture<UploadedFileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedFileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedFileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
