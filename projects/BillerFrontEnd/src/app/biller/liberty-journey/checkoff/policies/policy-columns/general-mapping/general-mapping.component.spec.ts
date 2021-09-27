import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMappingComponent } from './general-mapping.component';

describe('GeneralMappingComponent', () => {
  let component: GeneralMappingComponent;
  let fixture: ComponentFixture<GeneralMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
