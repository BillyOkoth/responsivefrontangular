import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidEslipsComponent } from './paid-eslips.component';

describe('PaidEslipsComponent', () => {
  let component: PaidEslipsComponent;
  let fixture: ComponentFixture<PaidEslipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidEslipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidEslipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
