import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCountriesComponent } from './upload-countries.component';

describe('UploadCountriesComponent', () => {
  let component: UploadCountriesComponent;
  let fixture: ComponentFixture<UploadCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
