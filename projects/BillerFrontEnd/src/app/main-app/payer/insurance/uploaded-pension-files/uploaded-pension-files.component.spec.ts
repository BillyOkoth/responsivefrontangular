import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedPensionFilesComponent } from './uploaded-pension-files.component';

describe('UploadedPensionFilesComponent', () => {
  let component: UploadedPensionFilesComponent;
  let fixture: ComponentFixture<UploadedPensionFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedPensionFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedPensionFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
