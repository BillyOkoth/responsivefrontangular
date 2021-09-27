import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSectorsComponent } from './add-sectors.component';

describe('AddSectorsComponent', () => {
  let component: AddSectorsComponent;
  let fixture: ComponentFixture<AddSectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
