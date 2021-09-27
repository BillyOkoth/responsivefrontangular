import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillerProfileComponent } from './biller-profile.component';

describe('BillerProfileComponent', () => {
  let component: BillerProfileComponent;
  let fixture: ComponentFixture<BillerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
