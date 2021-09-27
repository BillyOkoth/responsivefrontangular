import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSectorsComponent } from './upload-sectors.component';

describe('UploadSectorsComponent', () => {
  let component: UploadSectorsComponent;
  let fixture: ComponentFixture<UploadSectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
