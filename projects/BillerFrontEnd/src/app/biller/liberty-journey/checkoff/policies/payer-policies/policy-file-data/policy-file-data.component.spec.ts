import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyFileDataComponent } from './policy-file-data.component';

describe('PolicyFileDataComponent', () => {
  let component: PolicyFileDataComponent;
  let fixture: ComponentFixture<PolicyFileDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyFileDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyFileDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
