import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralColumnsComponent } from './general-columns.component';

describe('GeneralColumnsComponent', () => {
  let component: GeneralColumnsComponent;
  let fixture: ComponentFixture<GeneralColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
