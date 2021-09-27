import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoffPayerComponent } from './checkoff-payer.component';

describe('CheckoffPayerComponent', () => {
  let component: CheckoffPayerComponent;
  let fixture: ComponentFixture<CheckoffPayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoffPayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoffPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
