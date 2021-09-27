import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyColumnsComponent } from './policy-columns.component';

describe('PolicyColumnsComponent', () => {
  let component: PolicyColumnsComponent;
  let fixture: ComponentFixture<PolicyColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
