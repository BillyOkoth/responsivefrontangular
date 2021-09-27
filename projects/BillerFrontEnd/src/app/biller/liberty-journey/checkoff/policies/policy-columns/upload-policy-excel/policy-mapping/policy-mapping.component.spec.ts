import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyMappingComponent } from './policy-mapping.component';

describe('PolicyMappingComponent', () => {
  let component: PolicyMappingComponent;
  let fixture: ComponentFixture<PolicyMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
