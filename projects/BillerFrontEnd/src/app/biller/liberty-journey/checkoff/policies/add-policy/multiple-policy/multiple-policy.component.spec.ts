import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplePolicyComponent } from './multiple-policy.component';

describe('MultiplePolicyComponent', () => {
  let component: MultiplePolicyComponent;
  let fixture: ComponentFixture<MultiplePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
